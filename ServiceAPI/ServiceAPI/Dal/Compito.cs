using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceAPI.Dal
{
    public class Job
    {
        public Job()
        {
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DeadLine { get; set; }
        public string Allegati { get; set; }
        public int IdProject { get; set; }
    }
}
