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
    public class ProductsRepository
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
        public IEnumerable<Product> GetProductsTop5()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select top 5 * 
                       from Products
                       where isActive = 1
                       order by DateAdded desc";

            var topProducts = db.Query<Product>(sql);

            return topProducts;
        }

        //#2 this is for the sort by theme
        public List<Product> GetProductsbyTheme(int productThemeId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select*
                       from Products p
                       where p.ProductThemeId = @productThemeId";
                      var parameters = new { productThemeId = productThemeId };

            var selectedTheme = db.Query<Product>(sql, parameters);
           return selectedTheme.ToList();
          
        }
    }
}
