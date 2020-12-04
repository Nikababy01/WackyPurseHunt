using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WackyPurseHunt.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateCreated { get; set; }
        public string Password { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string CityState { get; set; }
        public int Zipcode { get; set; }
        public Int64 PhoneNumber { get; set; }
        public string Uid { get; set; }
        public string PhotoImage { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
