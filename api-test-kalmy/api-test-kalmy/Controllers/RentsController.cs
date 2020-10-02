using api_test_kalmy.BD;
using api_test_kalmy.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace api_test_kalmy.Controllers
{
    public class RentsController : ApiController
    {
        [Authorize]
        [RoutePrefix("api/rents")]
        public class CustomersController : ApiController
        {
            ///<summary>
            ///Regresa un listado de rentas agrupados por uno o dos parametros
            ///</summary>
            ///<param name="request">Objeto con las propiedades A1 y A2</param>            
            ///<returns></returns>
            [HttpPost]
            [Route("getcarrents")]
            public string GetCarRents(CarRentsRequest request)
            {
                GeneralResponse res = new GeneralResponse();
                if (request == null || (request.A1 == "" && request.A2 == ""))
                {
                    res.Message = "Bad Request";
                    res.StatusCode = HttpStatusCode.BadRequest;
                    return JsonConvert.SerializeObject(res);
                }

                if(request.A1 == "" && request.A2 != "")
                {
                    request.A1 = request.A2;
                    request.A2 = "";
                }              

                if(request.A2 == "")
                {
                    List<Group1> agrupado = (from renta in CarRents.Rentas
                                    group renta
                                    by new
                                    {                                       
                                       FieldA = renta.GetType().GetProperty(request.A1).GetValue(renta, null).ToString(),                                      
                                    }                                  
                                    into group1                                       
                                    select new Group1
                                    {
                                        First = group1.Key.FieldA,
                                        Count = group1.Count()
                                      
                                    }).OrderBy(x => x.First).ToList();                    
                    res.Message = "Correcto";
                    res.Data = agrupado;
                    res.StatusCode = HttpStatusCode.OK;
                    return JsonConvert.SerializeObject(res);
                } else
                {
                    var agrupado = from renta in CarRents.Rentas

                                   group renta
                                   by new
                                   {                                       
                                       FieldA = renta.GetType().GetProperty(request.A1).GetValue(renta, null).ToString(),                                       
                                   }
                                   into group1
                                   orderby group1.Key.FieldA
                                   select new
                                   {
                                       First = group1.Key.FieldA,
                                       Group = group1.GroupBy(r => r.GetType().GetProperty(request.A2).GetValue(r, null).ToString())
                                       .Select(idGroup => new { Second = idGroup.Key, Count = idGroup.Count() }).OrderBy(x => x.Second)                                       
                                   };
                    res.Message = "Correcto";
                    res.Data = agrupado;
                    res.StatusCode = HttpStatusCode.OK;
                    return JsonConvert.SerializeObject(res);
                }
                
                
            }
        }
    }
}
