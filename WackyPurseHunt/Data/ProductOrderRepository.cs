using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WackyPurseHunt.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace WackyPurseHunt.Data
{
    public class ProductOrderRepository
    {
        static List<ProductOrder> productOrders = new List<ProductOrder>();

        const string _connectionString = "Server=localhost;Database= WackyPurseHunt;Trusted_Connection=True";
        public ProductOrder AddProductOrder(ProductOrder newLineItem)
        {
            var sqlInsert = @"INSERT INTO [dbo].[ProductOrders]
                                            ([ProductId]
                                            ,[OrderId]
                                            ,[Qty]
                                            ,[IsActive])
                                    Output inserted.Id
                                    VALUES
                                        (@productId, @orderId, @qty, @isActive)";
            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sqlInsert, newLineItem);

            var sqlGetLineItem = "select * from ProductOrders where Id = @id";
            var parameters = new { id = newId };

            var newProductOrder = db.QueryFirstOrDefault<ProductOrder>(sqlGetLineItem, parameters);

            return newProductOrder;
        }

        //Anca: Added an Add method that takes in the parameters rather than the whole object:
        public ProductOrder AddProductOrderWithProductAndOrderIds(int productId, int orderId, int qty)
        {
            var sqlInsertToCreateNewLineItem = @"INSERT INTO [dbo].[ProductOrders]
                                            ([ProductId]
                                            ,[OrderId]
                                            ,[Qty]
                                            ,[IsActive])
                                    Output inserted.Id
                                    VALUES
                                        (@productId, @orderId, @qty, 1)";
            using var db = new SqlConnection(_connectionString);
            var parametersForNewLineItem = new { productId, orderId, qty };

            var newId = db.ExecuteScalar<int>(sqlInsertToCreateNewLineItem, parametersForNewLineItem);
            //var newId

            //var sqlGetLineItem = "select * from ProductOrders where productId = @productid AND orderId = @orderId";
            //var newProductOrder = db.QueryFirstOrDefault<ProductOrder>(sqlGetLineItem, parametersForNewLineItem);

            var sqlGetLineItem = "select * from ProductOrders where Id = @id";
            var parameters = new { id = newId };

            var newProductOrder = db.QueryFirstOrDefault<ProductOrder>(sqlGetLineItem, parameters);


            return newProductOrder;
        }
    }
}
