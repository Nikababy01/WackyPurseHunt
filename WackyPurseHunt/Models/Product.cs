using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WackyPurseHunt.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public int ProductThemeId { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public int AvgStarRating { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
