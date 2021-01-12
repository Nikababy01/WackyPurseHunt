using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WackyPurseHunt.Data;

namespace WackyPurseHunt.Controllers
{
    [Route("api/productThemes")]
    [ApiController]
    public class ProductThemesController : FirebaseEnabledController
    {
        ProductThemeRepository _productThemesRepo;
        ProductsRepository _productsRepo;

        public ProductThemesController()
        {
            _productThemesRepo = new ProductThemeRepository();
            _productsRepo = new ProductsRepository();
        }

        [HttpGet]
        public IActionResult GetAllProductThemes()
        {
            var allproductThemes = _productThemesRepo.GetAll();

            return Ok(allproductThemes);
        }
    }
}
