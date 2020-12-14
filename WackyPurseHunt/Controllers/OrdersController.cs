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
        [HttpGet]
        public IActionResult GetAllOrders()
        {
            var allorders = _orderRepo.GetAll();

            return Ok(allorders);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            if (_orderRepo.GetOrderById(id) == null) return NotFound("We could not find this order. Please enter a valid order ID.");

            var selectedOrder = _orderRepo.GetOrderByIdWithLineItems(id);

            return Ok(selectedOrder);
        }

        // #1 method for getting the cart!!! in ordersData.js
        [HttpGet("cartByUid")]
        public IActionResult GetCart()
        {
            var currentUserId = _customerRepo.GetCustomerIdByUid(UserId);
            if (_orderRepo.GetCart(currentUserId) == null) return NoContent();

            var selectedOrder = _orderRepo.GetCart(currentUserId);

            return Ok(selectedOrder);
        }


        // this is used to create and order for AddToCart
        [HttpPost]
        public IActionResult CreateOrder(Order newOrder)
        {
            var currentUserId = _customerRepo.GetCustomerIdByUid(UserId);
            var brandNewOrder = _orderRepo.AddOrder(newOrder, currentUserId);

            return Created($"/api/orders/{brandNewOrder.Id}", brandNewOrder);
        }
        
        
        // writing a new method here to create a shopping cart order:
        [HttpPost("newCartByUid")]
        public IActionResult CreateShoppingCart()
        {
            var currentUserId = _customerRepo.GetCustomerIdByUid(UserId);
            var newCart = _orderRepo.CreateShoppingCart(currentUserId);
            return Created($"/api/orders/cart/{newCart.Id}", newCart);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, Order order)
        {
            var updatedOrder = _orderRepo.Update(id, order);

            if (_orderRepo.GetOrderById(id) == null)
            {
                return NotFound("We could not find an order with this ID. Please try again.");
            }

            return Ok(updatedOrder);
        }


    }
}
