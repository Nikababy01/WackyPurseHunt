using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using WackyPurseHunt.Models;
using Microsoft.Data.SqlClient;

namespace WackyPurseHunt.Data
{
    public class PaymentTypeRepository
    {
        const string _connectionString = "Server=localhost;Database= WackyPurseHunt;Trusted_Connection=True";

        public PaymentType GetSinglePaymentTypeById(int id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"select * 
                        from PaymentTypes
                        where Id = @id";

            var parameters = new { id = id };

            var singlePaymentType = db.QueryFirstOrDefault<PaymentType>(sql, parameters);

            return singlePaymentType;
        }

        public PaymentType AddNewPayment(PaymentType newPayment)
        {
            var sql = @"INSERT INTO [dbo].[PaymentTypes]
                        ([PaymentOption],
                         [CustomerId],
                         [AccountNo],
                         [ExpirationYear],
                         [ExpirationMonth],
                         [IsActive],
                         [Ccv])
                         Output inserted.Id
                        VALUES 
                         (@paymentOption,
                          @customerId,
                          @accountNo,
                          @expirationYear,
                          @expirationMonth,
                          @isActive,
                          @ccv)";

            using var db = new SqlConnection(_connectionString);

            var newPaymentTypeId = db.ExecuteScalar<int>(sql, newPayment);

            var getPaymentType = @"select *
                                   from PaymentTypes
                                   where Id = @id";

            var parameters = new { id = newPaymentTypeId };

            var addNewPayment = db.QueryFirstOrDefault<PaymentType>(getPaymentType, parameters);

            return addNewPayment;
        }
        public PaymentType UpdatePaymentType(int id, PaymentType updatedInfo)
        {
            var sql = @"UPDATE [dbo].[PaymentTypes]
                          SET [PaymentOption] = @paymentOption,
                          [CustomerId] = @customerId,
                          [AccountNo] = @accountNo,
                          [ExpirationYear] = @expirationYear,
                          [ExpirationMonth] = @expirationMonth,
                          [IsActive] = @isActive,
                          [CCV] = @ccv
                          OUTPUT INSERTED.*
                            WHERE Id = @id";
            using var db = new SqlConnection(_connectionString);

            var parameters = new
            {
                updatedInfo.PaymentOption,
                updatedInfo.CustomerId,
                updatedInfo.AccountNo,
                updatedInfo.ExpirationYear,
                updatedInfo.ExpirationMonth,
                updatedInfo.IsActive,
                updatedInfo.CCV,
                id
            };

            var updatedPaymentType = db.QueryFirstOrDefault<PaymentType>(sql, parameters);

            return updatedPaymentType;
        }

    }
}
