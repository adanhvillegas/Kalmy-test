using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace api_test_kalmy.Models
{
    public class GeneralResponse
    {
        public object Data { get; set; }
        public string Message { get; set; }
        public HttpStatusCode StatusCode { get; set; }
    }
}