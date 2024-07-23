using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Models
{
    public class AgregarDineroRequest
    {
        public string Cedula { get; set; }
        public decimal Dinero { get; set; }
    }
}
