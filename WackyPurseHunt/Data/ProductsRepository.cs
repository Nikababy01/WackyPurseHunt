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
        public List<Product> GetProductsByColor(string color)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select*
                       from Products p
                       where p.Color = @color";
            var parameters = new { color = color };

            var selectedColor = db.Query<Product>(sql, parameters);
            return selectedColor.ToList();

        }

        public List<Product> GetProductsBySize(string size)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select*
                       from Products p
                       where p.Size = @size";
            var parameters = new { size = size };

            var selectedSize = db.Query<Product>(sql, parameters);
            return selectedSize.ToList();

        }
        public int Add(Product newProduct)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"INSERT INTO [dbo].[Products]
                                    ([Title]
                                    ,[ImageUrl] 
                                    ,[ProductThemeId] 
                                    ,[Price]
                                    ,[Description]
                                    ,[DateAdded]
                                    ,[AvgStarRating]
                                    ,[Color]
                                    ,[Size]
                                    ,[IsActive])
                                    Output inserted.Id
                                   VALUES
                                        (@title,@imageUrl,@productThemeId,@price,@description,GETDATE(),@avgStarRating,@color,@size,@isActive)";
            var productInfo = new
            {
                title = newProduct.Title,
                imageUrl = newProduct.ImageUrl,
                productThemeId = newProduct.ProductThemeId,
                price = newProduct.Price,
                description = newProduct.Description,
                dateAdded = newProduct.DateAdded,
                avgStarRating = newProduct.AvgStarRating,
                color = newProduct.Color,
                size = newProduct.Size,
                isActive = newProduct.IsActive,
            };


        var newId = db.ExecuteScalar<int>(sql, productInfo);

        newProduct.Id = newId;
            return newId;

        }

        public Product Update(int id, Product product)
        {
            var sql = @"Update[dbo].[Products]
                                 SET [Title] = @title
                                    ,[ImageUrl] = @imageUrl
                                    ,[ProductThemeId] = @productThemeId
                                    ,[Price] = @price
                                    ,[Description] = @description
                                    ,[DateAdded] = GETDATE()
                                    ,[AvgStarRating] = @avgStarRating
                                    ,[Color] = @color
                                    ,[Size] = @size
                                    ,[IsActive] = @isActive
                                    output inserted.*
                                    Where Id = @id";
            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                Title = product.Title,
                ImageUrl = product.ImageUrl,
                ProductThemeId = product.ProductThemeId,
                Price = product.Price,
                Description = product.Description,
                DateAdded = product.DateAdded,
                AvgStarRating = product.AvgStarRating,
                Color = product.Color,
                Size = product.Size,
                IsActive = product.IsActive
            };

            var updatedProducts = db.QueryFirstOrDefault<Product>(sql, parameters);
            return updatedProducts;

        }

        public void Remove(int id)
        {
            var sql = @"DELETE
                        FROM [dbo].[Products]
                        Where Id = @id";

            using var db = new SqlConnection(_connectionString);

            db.Execute(sql, new { id = id });
        }

    }
}