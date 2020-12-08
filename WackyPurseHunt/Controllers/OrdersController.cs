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
    [Route("api/[orders]")]
    [ApiController]
    public class OrdersController : FirebaseEnabledController
    {
        OrderRepository _orderRepo;
        CustomerRepository _customerRepo;

        public string CustomerId { get; private set; }

        public OrdersController()
        {
            _orderRepo = new OrderRepository();
            _customerRepo = new CustomerRepository();
        }
        [HttpGet]
        public IActionResult GetAllOrders()
        {
            var allOrders = _orderRepo.GetAllOrders();

            return Ok(allOrders);
        }
        // method for getting the cart!!!
        [HttpGet("cartByUid")]
        public IActionResult GetCart()
        {
            var currentCustomerId = _customerRepo.GetCustomerIdByUid(CustomerId);
            if (_orderRepo.GetCart(currentCustomerId) == null) return NoContent();

            var selectedOrder = _orderRepo.GetCart(currentCustomerId);

            return Ok(selectedOrder);
        }

        // writing a new method here to create a shopping cart order:
        //[HttpPost("newCartByUid")]
        //public IActionResult CreateShoppingCart()
        //{
        //    var currentCustomerId = _customerRepo.GetCustomerIdByUid(CustomerId);
        //    var newCart = _orderRepo.CreateShoppingCart(currentCustomerId);
        //    return Created($"/api/orders/cart/{newCart.Id}", newCart);
        //}
    }
}
