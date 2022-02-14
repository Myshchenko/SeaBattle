using API.GameDTOs;
using API.UserActionsDtos;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private DataContext _context;
        private readonly UserManager<AppUser> userManager;

        public ProfileController(DataContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            this.userManager = userManager;
        }

        [HttpGet("{login}")]
        public async Task<ActionResult<ProfileDTO>> GetProfile(string login)
        {
            var userDTO = await userManager.Users.FirstOrDefaultAsync(x => x.Login == login);

            var allGames = await _context.GamePlayers.Where(x => x.AppUserId == userDTO.Id).ToListAsync();

            var allWins = allGames.Where(y => y.IsWinner == true).Count();

            return new ProfileDTO()
            {
                Login = login,
                AllMyGames = allGames.Count(),
                CountOfMyWins = allWins
            };
        }

        [HttpGet("{loginUser}/info")]
        public async Task<ActionResult<List<ProfileGames>>> GetProfileGames(string loginUser)
        {
            var currentUser = await userManager.Users.FirstOrDefaultAsync(x => x.Login == loginUser);

            var userGames = await _context.GamePlayers.Where(x => x.AppUserId == currentUser.Id).ToListAsync();

            var Games = new List<ProfileGames>();

            foreach (var item in userGames)
            {
                var opponentGame = _context.GamePlayers.FirstOrDefault(x => x.GameId == item.GameId && x.AppUserId != currentUser.Id);

                if(opponentGame == null)
                {
                    continue;
                }

                var opponent = await userManager.Users.FirstOrDefaultAsync(x => x.Id == opponentGame.AppUserId);

                var game = await _context.Games.FirstOrDefaultAsync(x => x.Id == item.GameId);

                Games.Add(new ProfileGames
                {
                    OpponentName = opponent.Login,
                    CurrentCustomerMoves = item.Moves,
                    OpponentMoves = opponentGame.Moves,
                    GameDate = game.GameDate.ToString("dd.MM.yyyy hh:mm:ss tt"),
                    Result = item.IsWinner == true ? "Победа!" : "Проигрыш"
                });
            }

            return Games;
        }
    }
}
