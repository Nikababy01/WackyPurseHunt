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
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : FirebaseEnabledController
    {
        OrderRepository _orderRepo;
        CustomerRepository _customerRepo;
        public OrdersController()
        {
            _orderRepo = new OrderRepository();
            _customerRepo = new CustomerRepository();
        }

        // this is used to create and order for AddToCart
        [HttpPost]
        public IActionResult CreateOrder(Order newOrder)
        {
            var currentUserId = _customerRepo.GetCustomerIdByUid(UserId);
            var brandNewOrder = _orderRepo.AddOrder(newOrder, currentUserId);

            return Created($"/api/orders/{brandNewOrder.Id}", brandNewOrder);
        }
        // method for getting the cart!!!
        [HttpGet("cartByUid")]
        public IActionResult GetCart()
        {
            var currentUserId = _customerRepo.GetCustomerIdByUid(UserId);
            if (_orderRepo.GetCartById(currentUserId) == null) return NoContent();

            var selectedOrder = _orderRepo.GetCartById(currentUserId);

            return Ok(selectedOrder);
        }

        // writing a new method here to create a shopping cart order:
        [HttpPost("newCartByUid")]
        public IActionResult CreateShoppingCart()
        {
            var currentUserId = _customerRepo.GetCustomerIdByUid(UserId);
            var newCart = _orderRepo.CreateShoppingCart(currentUserId);
            return Created($"/api/orders/cart/{newCart.Id}", newCart);
        }

    }
}
