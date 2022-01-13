using API.UserActionsDtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FindOpponentController : ControllerBase
    {
        private readonly DataContext _context;

        public FindOpponentController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{currentLogin}")]
        public async Task<ActionResult<List<UserDTO>>> GetUsers(string currentLogin)
        {
            var users = await _context.Users.Where(x => x.Login != currentLogin).ToListAsync();

            var usersWithWins = new List<UserDTO>();

            foreach(var user in users)
            {
                var allGames = await _context.GamePlayers.Where(x => x.AppUserId == user.Id).ToListAsync();

                usersWithWins.Add(new UserDTO
                {
                    Login = user.Login,
                    AllGames = allGames.Count(),
                    CountOfWins = allGames.Where(y => y.IsWinner == true).Count()
                });
            }

            return usersWithWins;
        }
    }
}
