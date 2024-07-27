using AccesoDatos.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Operaciones
{
    public class ReservaDAO
    {
        HotelesAppSqlContext context = new HotelesAppSqlContext();
        public bool EliminarReserva(string cedula, int id)
        {
            try
            {
                var reserva = context.Reservas.Where(r => r.Id == id).FirstOrDefault();
                if (reserva != null)
                {
                    ClienteDAO clienteDAO = new ClienteDAO();
                    decimal dineroADevolver = reserva.PrecioTotal * 0.60m;
                    clienteDAO.AgregarDinero(cedula, dineroADevolver);
                    context.Reservas.Remove(reserva);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;  
            }
        }
    }
}
