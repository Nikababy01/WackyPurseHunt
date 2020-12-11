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
    [Route("api/lineitems")]
    [ApiController]
    public class ProductOrdersController : FirebaseEnabledController
    {
        ProductOrderRepository _productOrderRepo;
        OrderRepository _orderRepo;
        ProductOrderWithProductInfoRepository _productOrderWithInfoRepo;
        public ProductOrdersController()
        {
            _productOrderRepo = new ProductOrderRepository();
            _orderRepo = new OrderRepository();
            _productOrderWithInfoRepo = new ProductOrderWithProductInfoRepository();
        }

        [HttpPost("newOrder")]
        public IActionResult CreateProductOrder(ProductOrder newLineItem)
        {
            var brandNewProductOrder = _productOrderRepo.AddProductOrder(newLineItem);

            return Created($"/api/lineitems/{newLineItem.Id}", brandNewProductOrder);
        }
       
            
    


        //new method to post a ProductOrder based on productId and orderId:
        //used for AddToCart
        [HttpPost("{productId}/{orderId}/{qty}")]
        public IActionResult CreateProductOrderBasedOnProductAndOrderIds(int productId, int orderId, int qty)
        {
            var newLineItem = _productOrderRepo.AddProductOrderWithProductAndOrderIds(productId, orderId, qty);

            return Created($"/api/lineitems/{newLineItem.Id}", newLineItem);
        }

        [HttpPost]
        public IActionResult CreateProductOrderWIthInfo(ProductOrderWithProductInfo newLineItem)
        {
            var brandNewProductOrder = _productOrderWithInfoRepo.AddLineItem(newLineItem);

            return Created($"/api/lineitems/{newLineItem.Id}", brandNewProductOrder);
        }
    }
}
