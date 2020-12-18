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

        // #2 this goes with GetProductsbyTheme
        [HttpGet("theme/{productThemeId}")]

        public IActionResult GetProductByTheme(int productThemeId)
        {
            var productTheme = _productsRepo.GetProductsbyTheme(productThemeId);

            if (productTheme == null) return NotFound("Nothing was found with this id! Try again.");

            return Ok(productTheme);
        }

        // #3 this goes with GetProductsbyColor
        [HttpGet("colorCode/{color}")]

        public IActionResult GetProductByColor (string color)
        {
            var productColor = _productsRepo.GetProductsByColor(color);

            if (productColor == null) return NotFound("Nothing was found with this id! Try again.");

            return Ok(productColor);
        }

        // #3 this goes with GetProductsbySizes
        [HttpGet("sizes/{size}")]

        public IActionResult GetProductBySize(string size)
        {
            var productSize = _productsRepo.GetProductsBySize(size);

            if (productSize == null) return NotFound("Nothing was found with this id! Try again.");

            return Ok(productSize);
        }

        [HttpGet("Top")]
        public IActionResult GetProductsTopFive()
        {
            var topProducts = _productsRepo.GetProductsTop5();

            return Ok(topProducts);
        }

        // Post new products
        [HttpPost]
        public IActionResult CreateProduct(Product product)
        {
            _productsRepo.Add(product);

            return Created($"/api/products/{product.Id}", product);
        }
       
        //// Update existing products
        //[HttpPut("{id")]
        //public IActionResult UpdatedProducts(int id, Product product)
        //{
        //    var updatedProducts = _productsRepo.Update(id, product);
        //    return Ok(updatedProducts);
        //}

        //// Delete Products
        //[HttpDelete("{id}")]
        //public IActionResult DeleteProduct(int id)
        //{
        //    if(_productsRepo.GetProductById(id) == null)
        //    {
        //        return NotFound();
        //    }
        //    var selectedProduct = _productsRepo.GetProductById(id);
        //    _productsRepo.Remove(id);


        //    return Ok($"{selectedProduct.Title} has been deleted!");
        //}
    }
}
