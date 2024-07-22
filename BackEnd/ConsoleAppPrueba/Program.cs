// See https://aka.ms/new-console-template for more information
using AccesoDatos.Models;
using AccesoDatos.Operaciones;

ClienteDAO clienteDAO = new ClienteDAO();
/*bool insertado = clienteDAO.InsertarCliente("1043641923", "projahm1234", "Jorge Herrera", "jorgeandresherreramonsalve@gmail.com", "3135259363");
Console.WriteLine(insertado);*/

/*var c = clienteDAO.SeleccionarPorCedula("1043641923");
if (c != null)
{
    Console.WriteLine(c.Nombre);
}
else
{
    Console.WriteLine("cliente no encontrado");
}

var c2 = clienteDAO.SeleccionarPorCedula("10436419232");
if (c2 != null)
{
    Console.WriteLine(c2.Nombre);
}
else
{
    Console.WriteLine("cliente no encontrado");
}*/

/*bool actualizado = clienteDAO.ActualizarCliente("1234", "projahm1234", "Jorge Herrera", "jorgeandresherreramonsalve@gmail.com", "3135259363", "1043641923");
Console.WriteLine(actualizado);*/

/*bool eliminado = clienteDAO.EliminarCliente("1043641923");
Console.WriteLine(eliminado);*/

/*bool dineroIngresado = clienteDAO.AgregarDinero("1043641923", 1000.00m);
Console.WriteLine(dineroIngresado);*/

/*DateOnly diaentrada = new DateOnly(2024, 12, 24);
DateOnly diasalida = new DateOnly(2024, 12, 25);

bool insertadoAHotel = clienteDAO.IngresarAlHotel("1043641923", 1, 1, diaentrada, diasalida);
Console.WriteLine(insertadoAHotel);*/

HotelDAO hotelDAO= new HotelDAO();
/*var hoteles = hotelDAO.MostrarHoteles();
foreach(var hotel in hoteles)
{
    Console.WriteLine(hotel.Nombre);
    Console.WriteLine(hotel.Direccion);
    Console.WriteLine(hotel.Ciudad);
    Console.WriteLine(hotel.NumeroEstrellas);
    Console.WriteLine("---------------------------");
}*/

/*var hotelesPersona = hotelDAO.MostrarHotelesDelCliente("1043641923");
foreach (var hotel in hotelesPersona)
{
    Console.WriteLine(hotel.Nombre);
    Console.WriteLine(hotel.Direccion);
    Console.WriteLine(hotel.Ciudad);
    Console.WriteLine(hotel.NumeroEstrellas);
    Console.WriteLine(hotel.NumeroHabitacion);
    Console.WriteLine(hotel.Tipo);
    Console.WriteLine(hotel.FechaEntrada);
    Console.WriteLine(hotel.FechaSalida);
    Console.WriteLine(hotel.PrecioTotal);
    Console.WriteLine("----------------------------");
}*/

HabitacionDAO habitacionDAO = new HabitacionDAO();
/*var hab = habitacionDAO.SeleccionarHabitacionesDelHotel(2);
foreach(var habitacion in hab)
{
    Console.WriteLine(habitacion.Id);
    Console.WriteLine(habitacion.NumeroHabitacion);
    Console.WriteLine(habitacion.Tipo);
    Console.WriteLine(habitacion.PrecioNoche);
}*/

var cedula = clienteDAO.Login("1043641923", "projahm1234");
if (cedula != null)
{
    Console.WriteLine(cedula.Cedula);
}
else
{
    Console.WriteLine("Contraseña o cedula incorrecta");
}