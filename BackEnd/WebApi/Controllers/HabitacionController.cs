using AccesoDatos.Models;
using AccesoDatos.Operaciones;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class HabitacionController : ControllerBase
    {
        HabitacionDAO habitacionDAO=new HabitacionDAO();

        [HttpGet("habitaciones")]
        public List<Habitacion> MostrarHabitacionesDelHotel(int idHotel) => habitacionDAO.SeleccionarHabitacionesDelHotel(idHotel);
    }
}
