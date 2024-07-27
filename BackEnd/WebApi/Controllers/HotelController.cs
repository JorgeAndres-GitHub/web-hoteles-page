using AccesoDatos.Models;
using AccesoDatos.Operaciones;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        HotelDAO hotelDAO = new HotelDAO();

        [HttpGet("hoteles")]
        public List<Hotel> MostrarHoteles() => hotelDAO.MostrarHoteles();

        [HttpGet("hotelesCliente")]
        public List<HotelCliente> MostrarHotelesCliente(string cedula) => hotelDAO.MostrarHotelesDelCliente(cedula);

        [HttpGet("filtrarHoteles")]
        public ActionResult<List<Hotel>> FiltrarHoteles([FromQuery] string? nombre, [FromQuery] string? ciudad, [FromQuery] int? estrellas)
        {
            var result = hotelDAO.FiltrarHoteles(nombre, ciudad, estrellas);
            if (result == null || result.Count == 0)
            {
                return NotFound();
            }
            return Ok(result);
        }

    }
}
