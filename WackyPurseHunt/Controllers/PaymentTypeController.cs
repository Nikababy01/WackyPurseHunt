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
        [HttpGet("{id}")]
        public IActionResult GetSinglePaymentTypeById(int id)
        {
            var singlePayment = _paymentTypeRepo.GetSinglePaymentTypeById(id);
            if (singlePayment == null) return NotFound("Nothing was found with this id! Try again.");

            return Ok(singlePayment);
        }

        [HttpPost]
        public IActionResult AddNewPayment(PaymentType newPayment)
        {
            var createPaymentType = _paymentTypeRepo.AddNewPayment(newPayment);

            return Created($"/api/paymentTypes/{newPayment.Id}", createPaymentType);

        }
        [HttpPut("{id}")]
        public IActionResult UpdatePaymentType(int id, PaymentType paymentUpdate)
        {
            var updatePaymentType = _paymentTypeRepo.UpdatePaymentType(id, paymentUpdate);

            if (_paymentTypeRepo.GetSinglePaymentTypeById(id) == null)
            {
                return NotFound("We don't have a record of anything with this id! Try a different one!");
            }

            return Ok(updatePaymentType);
        }
    }
}
