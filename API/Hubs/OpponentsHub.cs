using API.GameDTOs;
using API.UserActionsDtos;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Persistence;
using System.Linq;
using System.Threading.Tasks;

namespace API.SignalR
{
    public class OpponentsHub : Hub
    {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;

        public OpponentsHub(DataContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public Task SendInvitation(InvitingsDTO invitingsDTO)
        {
            return Clients.All.SendAsync("UsersSendedInvitings", invitingsDTO);
        }

        public Task ReceiveInvitation(InvitingsDTO flag)
        {
            return Clients.All.SendAsync("StartEditing", flag);
        }

        public Task StartGame(UserDTO flag)
        {
            return Clients.All.SendAsync("GameStarded", flag);
        }

        public Task ChangeTurn(string login)
        {
            return Clients.All.SendAsync("Turn", login);
        }

        public Task FirePoint(PointDTO point)
        {
            var newPoint = new PointDTO() { X = point.X, Y = point.Y, Creator = point.Creator, AttackUser = point.AttackUser };

            var userWhoFiredPoint = _userManager.Users.FirstOrDefault(x => x.Login == point.AttackUser);

            var userWhoCreatedPoint = _userManager.Users.FirstOrDefault(x => x.Login == point.Creator);

            var fieldThisUsers = _context.Fields.FirstOrDefault(x => x.AppUserId == userWhoCreatedPoint.Id);

            var findPoint = _context.Points.FirstOrDefault(p => p.Creator == point.Creator && p.X == point.X && p.Y == point.Y);

            if(findPoint == null)
            {
                newPoint.Result = "Мимо!";
                return Clients.All.SendAsync("PointFired", newPoint);
            }

            var findPointOnFiled = _context.Locations.FirstOrDefault(x => x.FieldId == fieldThisUsers.Id && x.PointId == findPoint.Id);


            if (findPointOnFiled != null)
            {
                newPoint.Result = "Ранил!";
                return Clients.All.SendAsync("PointFired", newPoint);
            }
            else
            {
                newPoint.Result = "Мимо!";
                return Clients.All.SendAsync("PointFired", newPoint);
            }
        }
    }
}
