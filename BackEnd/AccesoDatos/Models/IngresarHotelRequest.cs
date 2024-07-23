using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Models
{
    public class IngresarHotelRequest
    {
        public int CantidadPersonas { get; set; }
        public string DiaEntradaMes { get; set; } // Mes de la fecha de entrada
        public string DiaEntradaAno { get; set; } // Año de la fecha de entrada
        public string DiaEntradaDia { get; set; } // Día de la fecha de entrada

        public string DiaSalidaMes { get; set; } // Mes de la fecha de salida
        public string DiaSalidaAno { get; set; } // Año de la fecha de salida
        public string DiaSalidaDia { get; set; } // Día de la fecha de salida
    }
}
