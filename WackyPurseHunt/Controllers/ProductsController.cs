using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WackyPurseHunt.Data;

namespace WackyPurseHunt.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        ProductRepository _repo;

        public ProductsController()
        {
            _repo = new ProductRepository();
        }

        //[HttpGet]
        //public IActionResult GetAllProducts()
        //{
        //    var allproducts = _repo.GetAll();

        //    return Ok(allproducts);
        //}
    }
}
