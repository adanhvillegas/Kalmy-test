using api_test_kalmy.BD;
using Swashbuckle.Application;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace api_test_kalmy
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            CarRents.CreateRentCars();

            GlobalConfiguration.Configuration
             .EnableSwagger(c =>
             {
                 var baseDirectory = AppDomain.CurrentDomain.BaseDirectory + @"\bin\";
                 var commentsFileName = Assembly.GetExecutingAssembly().GetName().Name + ".xml";
                 var commentsFile = Path.Combine(baseDirectory, commentsFileName);
                 c.SingleApiVersion("v1", "KALMY TEST API")
                  .Description("API para las pruebas de Kalmy")
              .Contact(cc => cc
                .Name("Adan Villegas Morales")
                //.Url("")
                .Email("adanhvillegas@gmail.com"));
                 c.IncludeXmlComments(commentsFile);
             })
         .EnableSwaggerUi();
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.Flush();
            }
        }
    }
}
