using System.Collections.Generic;

namespace Domain
{
    public class Point
    {
        public string Id { get; set; }

        public int X { get; set; }

        public int Y { get; set; }

        public string Creator { get; set; }

        public IList<Location> Locations { get; set; }
    }
}
