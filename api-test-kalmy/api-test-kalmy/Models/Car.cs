using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_test_kalmy.Models
{
    public class Car
    {        
        public enum Tipo { Small = 1, Medium = 2,Big = 3};

        public Tipo Type { get; set; }
        public string Model { get; set; }
        public string Brand { get; set; }

        
        
    }
}