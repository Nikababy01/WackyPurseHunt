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
    public class CustomersController : ControllerBase
    {
        CustomerRepository _repo;

        public CustomersController()
        {
            _repo = new CustomerRepository();
        }

        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            var allCustomers = _repo.GetAll();

            return Ok(allCustomers);
        }

    }
}
