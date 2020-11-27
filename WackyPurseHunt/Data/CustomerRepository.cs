using System;
using System.Collections.Generic;
using System.Linq;
using WackyPurseHunt.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace WackyPurseHunt.Data
{
    public class CustomerRepository
    {
        static List<Customer> _customers = new List<Customer>();

        const string _connectionString ="Server=localhost;Database= WackyPurseHunt;Trusted_Connection=True";
        public List<Customer> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var customers = db.Query<Customer>("select * from customers");

            return customers.ToList();
        }
    }
}
