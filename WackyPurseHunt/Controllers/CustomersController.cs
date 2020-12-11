using System;
using WackyPurseHunt.Data;
using WackyPurseHunt.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WackyPurseHunt.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomersController : FirebaseEnabledController
    {
        CustomerRepository _customerRepo;

        public CustomersController()
        {
            _customerRepo = new CustomerRepository();
        }

        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            var allCustomers = _customerRepo.GetAll();

            return Ok(allCustomers);
        }

        // used to get customer by id
        [HttpGet("{id}")]
        public IActionResult GetCustomersById(int id)
        {
            var selectedCustomer = _customerRepo.GetCustomerById(id);
            if (selectedCustomer == null) return NotFound("We did not find a customer with that Id. Please try again.");
            return Ok(selectedCustomer);
        }

        // New method to get the yser ID by the Firebase ID now that we have authentication via Firebase:
        [HttpGet("uid")]
        public IActionResult GetUserIdByUid()
        {
            var selectedUserId = _customerRepo.GetCustomerIdByUid(UserId);
            if (selectedUserId == 0) return NotFound("We did not find a customer with this UID. Please try again.");
            return Ok(selectedUserId);
        }

        [HttpPost]
        public IActionResult CreateNewCustomer(Customer customer)
        {
            _customerRepo.Add(customer);
            return Created($"/api/customers/{customer.Id}", customer);
        }
    }
}
