using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WackyPurseHunt.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        ProductsRepository _repo;

        public ProductsController()
        {
            _repo = new ProductsRepository();
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var allproducts = _repo.GetAll();

            return Ok(allproducts);
        }
    }
}
