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
        public string Login([FromBody] LoginRequest usuario)
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


        [HttpPost("insertarCliente")]
        public bool RegistrarCliente([FromBody] Cliente cliente) => clienteDAO.InsertarCliente(cliente.Cedula, cliente.Contrasenia, cliente.Nombre, cliente.Email, cliente.Telefono);


        [HttpPut("cliente")]
        public bool ActualizarCliente([FromBody] Cliente cliente, string? cedulaActualizada = null)
        {
            if (cedulaActualizada == null)
            {
                bool insertado1 = clienteDAO.ActualizarCliente(cliente.Cedula, cliente.Contrasenia, cliente.Nombre, cliente.Email, cliente.Telefono);
                return insertado1;                
            }
            else
            {
                bool insertado2 = clienteDAO.ActualizarCliente(cliente.Cedula, cliente.Contrasenia, cliente.Nombre, cliente.Email, cliente.Telefono, cedulaActualizada);
                return insertado2;
            }
        }

        [HttpPost("dinero")]
        public bool AgregarDinero([FromBody] AgregarDineroRequest request) => clienteDAO.AgregarDinero(request.Cedula, request.Dinero);

        [HttpDelete("cliente")]
        public bool EliminarCliente(string cedula) => clienteDAO.EliminarCliente(cedula);

        [HttpPost("ingresarClienteHotel")]
        public bool IngresarAlHotel([FromBody] IngresarHotelRequest request, string cedula, int idHabitacion)
        {
            try
            {
                if (int.TryParse(request.DiaEntradaAno, out int anoEntrada) &&
            int.TryParse(request.DiaEntradaMes, out int mesEntrada) &&
            int.TryParse(request.DiaEntradaDia, out int diaEntrada) &&
            int.TryParse(request.DiaSalidaAno, out int anoSalida) &&
            int.TryParse(request.DiaSalidaMes, out int mesSalida) &&
            int.TryParse(request.DiaSalidaDia, out int diaSalida))
                {
                    // Crear DateOnly a partir de las cadenas
                    DateOnly diaEntradaDate = new DateOnly(anoEntrada, mesEntrada, diaEntrada);
                    DateOnly diaSalidaDate = new DateOnly(anoSalida, mesSalida, diaSalida);

                    return clienteDAO.IngresarAlHotel(cedula, idHabitacion, request.CantidadPersonas, diaEntradaDate, diaSalidaDate);
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpGet("dinero")]
        public decimal MostrarDinero(string cedula) => clienteDAO.MostrarSaldo(cedula);
    }
}
