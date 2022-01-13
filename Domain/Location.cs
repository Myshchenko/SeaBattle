using System;
using System.Collections.Generic;

namespace Domain
{
    public class Location
    {
        public string FieldId { get; set; }
        public Field Field { get; set; }


        public string PointId { get; set; }
        public Point Point { get; set; }
    }
}
