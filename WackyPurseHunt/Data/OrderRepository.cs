using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using WackyPurseHunt.Models;
using Microsoft.Data.SqlClient;

namespace WackyPurseHunt.Data
{
    public class OrderRepository
    {
        static List<Order> orders = new List<Order>();

        const string _connectionString = "Server=localhost;Database= WackyPurseHunt;Trusted_Connection=True";
        
        //this function is used for addToCart
        public Order AddOrder(Order orderToAdd, int customerId)
        {
            var sqlInsert = @"INSERT INTO [dbo].[Orders]
                                            ([CustomerId]
                                             ,[IsCompleted]   
                                             ,[TotalPrice] 
                                             ,[PaymentTypeId]
                                             ,[IsActive] )
                                            Output inserted.Id
                                            VALUES
                                            (@customerId,0,0,1,1)";
            using var db = new SqlConnection(_connectionString);
            var parametersForNewOrder = new { customerId };
            var newId = db.ExecuteScalar<int>(sqlInsert, parametersForNewOrder);

            var sqlGetOrder = "select * from Orders where Id = @id";
            var parameters = new { id = newId };
            var newOrder = db.QueryFirstOrDefault<Order>(sqlGetOrder, parameters);

            return newOrder;
        }
        // Get single order with related ProductOrder records too!
        public Order GetOrderByIdWithLineItems(int id)
        {
            using var db = new SqlConnection(_connectionString);
            // get the list of ProductOrder records associated with this order it:
            var queryForLineItems = @"select *
                                      from ProductOrders po
                                      where po.OrderId = @id";
            var parameters = new { id };
            var orderLineItems = db.Query<ProductOrderWithProductInfo>(queryForLineItems, parameters);

            // get the details of the order id passed in as a parameter:
            var queryForOrder = @"select *
                                  from Orders o
                                  where o.Id = @id";
            var selectedOrder = db.QueryFirstOrDefault<Order>(queryForOrder, parameters);

            // assign the ProductOrder records returned by the first query above to the LineItems List property on the order object:
            selectedOrder.LineItems = (List<ProductOrderWithProductInfo>)orderLineItems;

            return selectedOrder;
        }

        // DEFINITION OF EXISTING CART: Get current incomplete/pending order for a given user (with related ProductOrder records too)!
        public Order GetCart(int id)
        {
            using var db = new SqlConnection(_connectionString);

            // get the details of the order id for the userId passed in as a parameter:
            var parameterCustomerId = new { id };
            var queryForOrder = @"select *
                                from Orders o
                                where IsCompleted = 0 AND CustomerID = @id AND IsActive = 1"; //what is on the left side of the equation here is the variable I am declaring - and I am filling it with the data on the right, which is the parameter we are passing in to the method / and the variable is calling that parameter!!          
            var selectedOrder = db.QueryFirstOrDefault<Order>(queryForOrder, parameterCustomerId);


            // OPTION to start using uid above!!!!
            

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
