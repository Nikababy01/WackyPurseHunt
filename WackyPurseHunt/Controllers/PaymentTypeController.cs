using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WackyPurseHunt.Data;
using WackyPurseHunt.Models;

namespace WackyPurseHunt.Controllers
{
    [Route("api/paymentTypes")]
    [ApiController]
    public class PaymentTypeController : FirebaseEnabledController
    {
        PaymentTypeRepository _paymentTypeRepo;
        CustomerRepository _customerRepo;
        public PaymentTypeController()
        {
            _paymentTypeRepo = new PaymentTypeRepository();
            _customerRepo = new CustomerRepository();
        }

        [HttpPost]
        public IActionResult AddNewPayment(PaymentType newPayment)
        {
            var createPaymentType = _paymentTypeRepo.AddNewPayment(newPayment);

            return Created($"/api/paymentTypes/{newPayment.Id}", createPaymentType);

        }
    }
}
