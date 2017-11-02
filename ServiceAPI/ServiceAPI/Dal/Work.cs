using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace ServiceAPI.Dal
{
    public class Work
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string Allegati { get; set; }
        public int IdProject { get; set; }
        public int Student_Id { get; set; }
    }
}
