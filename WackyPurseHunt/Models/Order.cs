using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WackyPurseHunt.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public bool IsCompleted { get; set;  }
        public decimal TotalPrice { get; set; } = 0;
        public int PaymentTypeId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public bool IsActive { get; set; } = true;
        public List<ProductOrderWithProductInfo> LineItems { get; set; } = new List<ProductOrderWithProductInfo>();
    }
}
