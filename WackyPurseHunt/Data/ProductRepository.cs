using System;
using WackyPurseHunt.Models;
using WackyPurseHunt.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;

namespace WackyPurseHunt.Data
{
    public class ProductRepository
    {
        static List<Product> _products = new List<Product>();

        const string _connectionString = "Server=localhost;Database= WackyPurseHunt;Trusted_Connection=True";
        public List<Product> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var products = db.Query<Product>("select * from products where IsActive= 1 ");

            return products.ToList();
        }
        public Product GetProductById(int id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select * 
                        from Products
                        where Id = @id";

            var parameters = new { id = id };

            var singleProduct = db.QueryFirstOrDefault<Product>(sql, parameters);

            return singleProduct;
        }

    }
}
