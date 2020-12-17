using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WackyPurseHunt.Models
{
    public class PaymentType
    {
        public int Id { get; set; }
        public string PaymentOption { get; set; }
        public int CustomerId { get; set; }
        public int AccountNo { get; set; }
        public int ExpirationYear { get; set; }
        public int ExpirationMonth { get; set; }
        public int CCV { get; set; }
        public bool IsActive { get; set; } = true;

    }
}
