using AccesoDatos.Context;
using AccesoDatos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Operaciones
{
    public class HotelDAO
    {
        HotelesAppSqlContext hotelesAppSqlContext = new HotelesAppSqlContext();

        /// <summary>
        /// Muestra todos los datos de las reservas que tenga el cliente
        /// </summary>
        /// <param name="cedula"></param>
        /// <returns></returns>
        public List<HotelCliente> MostrarHotelesDelCliente(string cedula)
        {
            var query = from hab in hotelesAppSqlContext.Habitacions
                        join h in hotelesAppSqlContext.Hotels
                        on hab.HotelId equals h.Id
                        join r in hotelesAppSqlContext.Reservas
                        on hab.Id equals r.HabitacionId
                        where r.ClienteCedula == cedula
                        select new HotelCliente
                        {
                            Nombre = h.Nombre,
                            Direccion = h.Direccion,
                            Ciudad = h.Ciudad,
                            NumeroEstrellas = h.NumeroEstrellas,
                            NumeroHabitacion = hab.NumeroHabitacion,
                            Tipo = hab.Tipo,
                            FechaEntrada = r.FechaEntrada,
                            FechaSalida = r.FechaSalida,
                            PrecioTotal = r.PrecioTotal
                        };
            return query.ToList();
        }

        /// <summary>
        /// Mostrar todos los hoteles disponibles
        /// </summary>
        /// <returns></returns>
        public List<Hotel> MostrarHoteles()
        {
            var hoteles = hotelesAppSqlContext.Hotels;
            return hoteles.ToList();
        }
    }
}
