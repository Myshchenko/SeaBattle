using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string Login { get; set; }
        
        public Field Field { get; set; }
    }
}
