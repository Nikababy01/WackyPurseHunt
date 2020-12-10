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
    }
}
