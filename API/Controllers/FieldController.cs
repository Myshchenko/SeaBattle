using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using API.GameDTOs;
using Domain;
using Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FieldController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;

        public FieldController(DataContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("setCoordinates")]
        public async Task<ActionResult<Point>> SetCoordinates(PointDTO[] pointDto)
        {

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Login == pointDto[0].Creator);

            var field = await _context.Fields.FirstOrDefaultAsync(x => x.AppUserId == user.Id);

            for (int i = 0; i < pointDto.Length; i++)
            {
                var point = new Point
                {
                    Id = Guid.NewGuid().ToString(),
                    X = pointDto[i].X,
                    Y = pointDto[i].Y,
                    Creator = pointDto[i].Creator
                };

                _context.Points.Add(point);
                _context.SaveChanges();

                var location = new Location
                {
                    FieldId = field.Id,
                    PointId = point.Id
                };

                _context.Locations.Add(location);
                _context.SaveChanges();
            }

            return Ok();
        }

        [HttpPost("createField")]
        public async Task<ActionResult<Field>> CreateField(FieldDTO fieldDTO)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Login == fieldDTO.Creator);

            var checkIfFieldExist = await _context.Fields.FirstOrDefaultAsync(x => x.AppUserId == user.Id);

            if(checkIfFieldExist != null)
            {
                _context.Fields.Remove(checkIfFieldExist); // возможно тут ошибка
                _context.SaveChanges();
            }

            var field = new Field
            {
                Id = Guid.NewGuid().ToString(),
                Height = fieldDTO.Height,
                Widht = fieldDTO.Widht,
                AppUserId = user.Id
            };

            _context.Fields.Add(field);

            await _context.SaveChangesAsync();

            return field;
        }

        [HttpDelete("{userLogin}")]
        public async Task<IActionResult> DeleteField(string userLogin)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Login == userLogin);

            //var field = _context.Fields.FirstOrDefault(x => x.AppUserId == user.Id);

            _context.Fields.Remove(_context.Fields.FirstOrDefault(x => x.AppUserId == user.Id));

            _context.RemoveRange(_context.Points.Where(x => x.Creator == userLogin));

            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{userLogin}/clear")]
        public async Task<IActionResult> ClearField(string userLogin)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Login == userLogin);

            var fieldCreatedByUser = _context.Fields.FirstOrDefault(x => x.AppUserId == user.Id);

            string textDTO = "user " + user.Id + " fieldCreatedByUser" + fieldCreatedByUser.Id + Environment.NewLine;

            System.IO.File.AppendAllText(@"C:\Users\Myshchenko\Desktop\GetProfileGames.txt", textDTO);

            var filledPoints = _context.Locations.Where(x => x.FieldId == fieldCreatedByUser.Id).ToList();

            foreach (var item in filledPoints)
            {
                _context.Points.Remove(_context.Points.FirstOrDefault(z => z.Id == item.PointId));
            }

            _context.RemoveRange(_context.Locations.Where(x => x.FieldId == fieldCreatedByUser.Id));

            _context.RemoveRange(_context.Points.Where(x => x.Creator == userLogin));

            _context.SaveChanges();

            return Ok();
        }
    }
}
