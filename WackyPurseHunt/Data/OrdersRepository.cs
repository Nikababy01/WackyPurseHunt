using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using WackyPurseHunt.Models;

namespace WackyPurseHunt.Data
{
    public class OrderRepository
    {
        static List<Order> orders = new List<Order>();

        const string _connectionString = "Server=localhost;Database= WackyPurseHunt;Trusted_Connection=True";

        public IEnumerable<Order> GetAllOrders()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = "select * from Orders";

            var allOrders = db.Query<Order>(sql);

            List<Order> ordersList = new List<Order>();
            ordersList = allOrders.ToList();

            foreach (var item in allOrders)
            {
                // get order id:
                var orderId = item.Id;

                // get all the line items for this order:
                var queryForLineItems = @"select *
                                      from ProductOrders po
                                      where po.OrderId = @id";
                var parameters = new { id = orderId };
                var orderLineItems = db.Query<ProductOrderWithProductInfo>(queryForLineItems, parameters);

                List<ProductOrderWithProductInfo> orderLineItemsList = orderLineItems.ToList();

                // assign the ProductOrder records returned by the query above to the LineItems List property on the order object:
                item.LineItems.AddRange(orderLineItemsList);
            }
            return allOrders;
        }
        
        // DEFINITION OF EXISTING CART: Get current incomplete/pending order for a given customer (with related ProductOrder records too)!
        public Order GetCart(int id)
        {
            using var db = new SqlConnection(_connectionString);

            // get the details of the order id for the customerId passed in as a parameter:
            var parameterCustomerId = new { id };
            var queryForOrder = @"select *
                                from Orders o
                                where IsCompleted = 0 AND CustomerID = @id AND IsActive = 1"; //what is on the left side of the equation here is the variable I am declaring - and I am filling it with the data on the right, which is the parameter we are passing in to the method / and the variable is calling that parameter!!          
            var selectedOrder = db.QueryFirstOrDefault<Order>(queryForOrder, parameterCustomerId);
            if (selectedOrder != null)
            {
                // get the list of ProductOrder records associated with this order it:
                var orderId = selectedOrder.Id;
                var parameterOrderId = new { OrderId = orderId };
                var queryForLineItems = @"select po.Id, po.IsActive, po.OrderId, po.ProductId, po.Qty, p.Title, p.ImageUrl, p.Price, p.Price*po.Qty AS Subtotal
                                      from ProductOrders po
	                                    join Products p
		                                    on po.ProductId = p.Id
                                      where po.OrderId = @OrderId AND po.IsActive=1";

                var orderLineItems = db.Query<ProductOrderWithProductInfo>(queryForLineItems, parameterOrderId);
                // assign the ProductOrder records returned by the first query above to the LineItems List property on the order object:
                selectedOrder.LineItems = (List<ProductOrderWithProductInfo>)orderLineItems;

                if (selectedOrder.LineItems.Count == 0)
                {
                    selectedOrder.TotalPrice = 0;
                }
                else
                {
                    var queryForTotalPrice = @"select SUM(x.Subtotal)
                                            from (
                                            select p.Price*po.Qty AS Subtotal                                    
                                            from ProductOrders po
                                            join Products p
                                            on po.ProductId = p.Id
                                            where po.OrderId = @OrderId AND po.IsActive=1) x";
                    var totalPrice = db.QueryFirst<decimal>(queryForTotalPrice, parameterOrderId);
                    selectedOrder.TotalPrice = totalPrice;
                }
            }

            return selectedOrder;
        }
     }
}