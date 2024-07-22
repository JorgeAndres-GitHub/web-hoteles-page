using AccesoDatos.Context;
using AccesoDatos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Operaciones
{
    public class HabitacionDAO
    {
        HotelesAppSqlContext hotelesAppSqlContext = new HotelesAppSqlContext();

        /// <summary>
        /// Mostrar las habitaciones que tiene el hotel
        /// </summary>
        /// <param name="idHotel"></param>
        /// <returns></returns>
        public List<Habitacion> SeleccionarHabitacionesDelHotel(int idHotel)
        {
            var habitaciones=hotelesAppSqlContext.Habitacions.Where(h=>h.HotelId==idHotel).ToList();

            return habitaciones;
        }
    }
}
