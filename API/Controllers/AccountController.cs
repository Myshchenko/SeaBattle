using API.UserActionsDtos;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private DataContext _context;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, DataContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await userManager.FindByEmailAsync(loginDTO.Email);

            if (user == null) return Unauthorized();

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if(result.Succeeded)
            {
                var allGames = await _context.GamePlayers.Where(x => x.AppUserId == user.Id).ToListAsync();

                return new UserDTO
                {
                    Login = user.Login,
                    IsReadyToPlay = false,
                    AllGames = allGames.Count(),
                    CountOfWins = allGames.Where(y => y.IsWinner == true).Count()
                };
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if(await userManager.Users.AnyAsync(x => x.Email == registerDTO.Email))
            {
                return BadRequest("Email taken.");
            }

            if (await userManager.Users.AnyAsync(x => x.UserName.ToUpper() == registerDTO.Login))
            {
                return BadRequest("Username taken.");
            }

            var user = new AppUser
            {
                Login = registerDTO.Login,
                Email = registerDTO.Email,
                UserName = registerDTO.Login
            };

            var result = await userManager.CreateAsync(user, registerDTO.Password);

            if(result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem registring user.");
        }

        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        private UserDTO CreateUserObject(AppUser user)
        {
            return new UserDTO
            {
                Login = user.Login,
                CountOfWins = 0,
                AllGames = 0
            };
        }
    }
}
