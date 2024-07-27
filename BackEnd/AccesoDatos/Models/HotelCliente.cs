using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Models
{
    public class HotelCliente
    {
        public int ReservaId { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string Ciudad { get; set; }
        public int NumeroEstrellas { get; set; }
        public int NumeroHabitacion { get; set; }
        public string Tipo { get; set; }
        public DateOnly FechaEntrada { get; set; }
        public DateOnly FechaSalida { get; set; }
        public decimal PrecioTotal { get; set; }
    }
}
