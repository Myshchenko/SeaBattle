using System;
using System.Collections.Generic;

namespace Domain
{
    public class Field
    {
        public string Id { get; set; }

        public int Height { get; set; }
        public int Widht { get; set; }


        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }


        public IList<Location> Locations { get; set; }
    }
}
