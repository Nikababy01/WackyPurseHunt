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
    public class ProductsController : FirebaseEnabledController
    {
        ProductsRepository _productsRepo;

        public ProductsController()
        {
            _productsRepo = new ProductsRepository();
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
          var allproducts = _productsRepo.GetAll();

          return Ok(allproducts);
        }
        
        [HttpGet("{id}")]
        
        public IActionResult GetSingleProduct(int id)
        {
            var singleProduct = _productsRepo.GetProductById(id);  
             

            if (singleProduct == null) return NotFound("Nothing was found with this id! Try again.");

            return Ok(singleProduct);
        }
        
        [HttpGet("Top")]
        public IActionResult GetProductsTopFive()
        {
            var topProducts = _productsRepo.GetProductsTop5();

            return Ok(topProducts);
        }
    }
}
