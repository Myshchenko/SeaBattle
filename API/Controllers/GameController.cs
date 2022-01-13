using API.GameDTOs;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using System;
using Domain;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using API.UserActionsDtos;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;

        public GameController(DataContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("createGame")]
        public async Task<ActionResult<GameDTO>> CreateGame(GameDTO gameDTO)
        {
            var newGame = new Game()
            {
                Id = Guid.NewGuid().ToString(),
                GameDate = gameDTO.GameDate
            };

            _context.Games.Add(newGame);

            _context.SaveChanges();

            var firstUser = _userManager.Users.FirstOrDefault(x => x.Login == gameDTO.FirstUserLogin);

            var secondUser = _userManager.Users.FirstOrDefault(x => x.Login == gameDTO.SecondUserLogin);

            _context.GamePlayers.AddRange(
                new GamePlayers()
                {
                    Id = Guid.NewGuid().ToString(),
                    AppUserId = firstUser.Id,
                    GameId = newGame.Id,
                    Status = "В процессе"
                },
                 new GamePlayers()
                 {
                     Id = Guid.NewGuid().ToString(),
                     AppUserId = secondUser.Id,
                     GameId = newGame.Id,
                     Status = "В процессе"
                 });

            _context.SaveChanges();

            return Ok();
        }

        [HttpPost("updateGame")]
        public async Task<ActionResult<GameDTO>> UpdateGame(UserAfterGame userAfterGame)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Login == userAfterGame.Login);

            var currentGameOfUser = _context.GamePlayers.FirstOrDefault(x => x.Status == "В процессе" && x.AppUserId == user.Id);

            currentGameOfUser.Status = "Закончена";
            currentGameOfUser.IsWinner = userAfterGame.IsWinner;
            currentGameOfUser.Moves = userAfterGame.CountOfMoves;

            //_context.GamePlayers.Update(currentGameOfUser);

            _context.SaveChanges();

            return Ok();
        }
    }
}
