using AccesoDatos.Operaciones;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class ReservaController : ControllerBase
    {
        ReservaDAO reservaDAO =new ReservaDAO();
        [HttpDelete("eliminarReserva")]
        public bool EliminarReserva(string cedula, int id) => reservaDAO.EliminarReserva(cedula, id);
    }
}
