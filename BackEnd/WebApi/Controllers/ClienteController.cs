using AccesoDatos.Models;
using AccesoDatos.Operaciones;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        ClienteDAO clienteDAO = new ClienteDAO();

        [HttpPost("cliente")]
        public string Login([FromBody] Cliente usuario)
        {
            var cliente=clienteDAO.Login(usuario.Cedula, usuario.Contrasenia);
            if (cliente != null)
            {
                return cliente.Cedula;
            }
            else
            {
                return null;
            }            
        }

    }
}
