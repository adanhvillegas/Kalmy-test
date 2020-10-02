using api_test_kalmy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static api_test_kalmy.Models.Car;

namespace api_test_kalmy.BD
{
    public static class CarRents
    {
        public static List<Car> Rentas = new List<Car>();

        public static void CreateRentCars()
        {
            Random random = new Random();

            List<string> Models = new List<string>();

            for (int i = 1990; i <= 2021; i++)
            {
                Models.Add(i.ToString());
            }

            List<string> Brans = new List<string> { "Toyota", "Nissan", "Acura", "Suzuki","Tesla","Chevrolet","Subaru","Dogge","Jeep","Ferrari", "Lamborghini","Audi","BMW","Volkswagen","Pontiac","Hyundai","KIA" };
            Array EnumsArray = Enum.GetValues(typeof(Tipo));
            for (int i = 0; i < 200; i++)
            {
                Car carro = new Car();
                carro.Model = Models[random.Next(Models.Count)];
                carro.Brand = Brans[random.Next(Brans.Count)];
                carro.Type = (Tipo)EnumsArray.GetValue(random.Next(EnumsArray.Length));

                Rentas.Add(carro);
            }
        }

    }
}