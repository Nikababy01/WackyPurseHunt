using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WackyPurseHunt.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string ReviewText { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int StarRatings { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
