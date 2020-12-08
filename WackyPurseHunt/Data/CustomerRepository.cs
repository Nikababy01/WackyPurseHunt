﻿using System;
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

        // NEW method to get the customer ID by the Firebase UID now that we have authentication via Firebase:
        public int GetCustomerIdByUid(string uid)
        {
            using var db = new SqlConnection(_connectionString);

            var queryForCustomerByUid = @"select *
                            from Customers
                            where Uid = @uid";

            var parameterForCustomerUid = new { uid };

            var selectedCustomerId = db.ExecuteScalar<int>(queryForCustomerByUid, parameterForCustomerUid);

            return selectedCustomerId;
        }

        public void Add(Customer customerToAdd)
        {
            var sql = @"INSERT INTO [dbo].[Customers]
                                    ([FirstName]
                                    ,[LastName]
                                    ,[Email]
                                    ,[DateCreated]
                                    ,[Password]
                                    ,[StreetAddress]
                                    ,[City]
                                    ,[CityState]
                                    ,[Zipcode]  
                                    ,[PhoneNumber]
                                    ,[Uid]
                                    ,[PhotoImage]
                                    ,[IsActive]
                                    )
                                    Output inserted.id
                                    VALUES 
                                    (@FirstName,@LastName,@Email,GETDATE(),@Password,@StreetAddress,@City,@CityState,@Zipcode,@PhoneNumber,@Uid,@PhotoImage,@IsActive)";
            using var db = new SqlConnection(_connectionString);
            var newId = db.ExecuteScalar<int>(sql, customerToAdd);
            customerToAdd.Id = newId;
        }
    }
}
