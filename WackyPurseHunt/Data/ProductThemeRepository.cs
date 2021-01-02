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
    public class ProductThemeRepository
    {
        static List<ProductTheme> _products = new List<ProductTheme>();

        const string _connectionString = "Server=localhost;Database= WackyPurseHunt;Trusted_Connection=True";
        public List<ProductTheme> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var productThemes = db.Query<ProductTheme>("select * from productThemes where IsActive= 1 ");

            return productThemes.ToList();
        }
    }
}
