using System.ComponentModel.DataAnnotations;

namespace API.UserActionsDtos
{
    public class RegisterDTO
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
