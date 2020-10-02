using api_test_kalmy.Models;
using Newtonsoft.Json;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;

namespace api_test_kalmy.Controllers
{

    //Llamada del login para autenticar usuario y generar un token JWT
    //Usuario y contraseña estan fijos
    //usuario = administrator
    //contraseña = miPassword12345
    [AllowAnonymous]
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        ///<summary>
        ///Autentifica al usuario mediante usuario y contraseña, si los datos son correctos regresa un token para los servicios que requieren autorizacion
        ///</summary>
        ///<param name="login">Objeto con las propiedades Username y Password</param>
        ///<returns></returns>
        [HttpPost]
        [Route("authenticate")]
        public string Authenticate(LoginRequest login)
        {
            GeneralResponse res = new GeneralResponse();

            if (login == null)
            {
                res.Message = "Bad Request";
                res.StatusCode = HttpStatusCode.BadRequest;
                return JsonConvert.SerializeObject(res);
            }


            if (login.Username != "administrator")
            {
                res.Message = "El usuario no existe";
                res.StatusCode = HttpStatusCode.Unauthorized;
                return JsonConvert.SerializeObject(res);
            }
            Encriptacion encrip = new Encriptacion();
            //Normalmento las contraseñas estan encriptadas, por lo que comparo la contraseña encriptando el password ingresado
            bool isCredentialValid = (encrip.GetSHA256(login.Password) == "564c8a8d6c2acaf01702439cdcb4b8dc99c24883d249c00a39d87994c7b3d70e");
            if (isCredentialValid)
            {
                var token = TokenGenerator.GenerateTokenJwt(login.Username);
                res.Message = "Correcto";
                res.Data = token;
                res.StatusCode = HttpStatusCode.OK;
                return JsonConvert.SerializeObject(res);
            }
            else
            {
                res.Message = "El password es incorrecto";
                res.StatusCode = HttpStatusCode.Unauthorized;
                return JsonConvert.SerializeObject(res);
            }
        }
        
    }
   
}

