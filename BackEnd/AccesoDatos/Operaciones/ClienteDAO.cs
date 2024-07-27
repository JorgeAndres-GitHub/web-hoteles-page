using AccesoDatos.Context;
using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Operaciones
{
    public class ClienteDAO
    {
        HotelesAppSqlContext hotelesAppSqlContext = new HotelesAppSqlContext();

        /// <summary>
        /// Buscar cliente por la cedula
        /// </summary>
        /// <param name="cedula"></param>
        /// <returns></returns>
        public Cliente SeleccionarPorCedula(string cedula)
        {
            var cliente = hotelesAppSqlContext.Clientes.Where(c => c.Cedula.Equals(cedula)).FirstOrDefault();
            return cliente;
        }

        public Cliente Login(string cedula, string contrasenia)
        {
            var cliente=hotelesAppSqlContext.Clientes.Where(c=>c.Cedula.Equals(cedula) && c.Contrasenia.Equals(contrasenia)).FirstOrDefault();
            return cliente;
        }

        /// <summary>
        /// Registrar un nuevo cliente a la base de datos
        /// </summary>
        /// <param name="cedula"></param>
        /// <param name="contrasenia"></param>
        /// <param name="nombre"></param>
        /// <param name="email"></param>
        /// <param name="telefono"></param>
        /// <returns></returns>
        public bool InsertarCliente(string cedula, string contrasenia, string nombre, string email, string telefono)
        {
            try
            {
                Cliente cliente = new Cliente();
                cliente.Cedula = cedula;
                cliente.Contrasenia = contrasenia;
                cliente.Nombre = nombre;
                cliente.Email = email;
                cliente.Telefono = telefono;
                cliente.Dinero = 0;
                hotelesAppSqlContext.Clientes.Add(cliente);
                hotelesAppSqlContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Actualizar los datos del cliente encontrado por la cedula
        /// </summary>
        /// <param name="cedula"></param>
        /// <param name="contrasenia"></param>
        /// <param name="nombre"></param>
        /// <param name="email"></param>
        /// <param name="telefono"></param>
        /// <param name="cedulaActualizada"></param>
        /// <returns></returns>
        public bool ActualizarCliente(string cedula, string contrasenia, string nombre, string email, string telefono, string? cedulaActualizada = null)
        {
            using (var transaction = hotelesAppSqlContext.Database.BeginTransaction())
            {
                try
                {
                    var cliente = SeleccionarPorCedula(cedula);
                    if (cliente == null)
                    {
                        return false;
                    }
                    else
                    {
                        if (!string.IsNullOrWhiteSpace(cedulaActualizada) && !cedula.Equals(cedulaActualizada))
                        {
                            var nuevoCliente = new Cliente
                            {
                                Cedula = cedulaActualizada,
                                Contrasenia = contrasenia,
                                Nombre = nombre,
                                Email = email,
                                Telefono = telefono,
                                Dinero = cliente.Dinero
                            };

                            //Agregar cliente con cedula actualizada
                            hotelesAppSqlContext.Clientes.Add(nuevoCliente);
                            hotelesAppSqlContext.SaveChanges();

                            var reservas = hotelesAppSqlContext.Reservas.Where(r => r.ClienteCedula == cedula).ToList();
                            foreach (var reserva in reservas)
                            {
                                reserva.ClienteCedula = cedulaActualizada;
                            }

                            hotelesAppSqlContext.SaveChanges();                            

                            //Eliminar cliente con cedula desactualizada
                            hotelesAppSqlContext.Clientes.Remove(cliente);
                            hotelesAppSqlContext.SaveChanges();                            

                            transaction.Commit();

                        }
                        else
                        {
                            cliente.Contrasenia = contrasenia;
                            cliente.Nombre = nombre;
                            cliente.Email = email;
                            cliente.Telefono = telefono;
                            hotelesAppSqlContext.SaveChanges();

                            transaction.Commit();
                        }

                        return true;
                    }
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return false;
                }
            }            
        }

        /// <summary>
        /// Eliminar cliente seleccionado por cedula
        /// </summary>
        /// <param name="cedula"></param>
        /// <returns></returns>
        public bool EliminarCliente(string cedula)
        {
            try
            {
                var cliente = SeleccionarPorCedula(cedula);
                if (cliente != null)
                {
                    hotelesAppSqlContext.Clientes.Remove(cliente);
                    hotelesAppSqlContext.SaveChanges();
                    return true;
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

        /// <summary>
        /// Agregar dinero a la cuenta
        /// </summary>
        /// <param name="cedula"></param>
        /// <param name="dinero"></param>
        /// <returns></returns>
        public bool AgregarDinero(string cedula, decimal dinero)
        {
            try
            {
                var cliente = SeleccionarPorCedula(cedula);
                if (cliente != null)
                {
                    cliente.Dinero += dinero;
                    hotelesAppSqlContext.SaveChanges();
                    return true;
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

        /// <summary>
        /// Escoger habitacion y hotel del cliente
        /// </summary>
        /// <param name="cedula"></param>
        /// <param name="idHabitacion"></param>
        /// <param name="cantidadPersonas"></param>
        /// <param name="diaEntrada"></param>
        /// <param name="diaSalida"></param>
        /// <returns></returns>
        public bool IngresarAlHotel(string cedula, int idHabitacion, int cantidadPersonas, DateOnly diaEntrada, DateOnly diaSalida)
        {
            try
            {
                var cliente = SeleccionarPorCedula(cedula);
                if (cliente != null)
                {
                    var habitacion = hotelesAppSqlContext.Habitacions.Where(h => h.Id == idHabitacion).FirstOrDefault();

                    if (habitacion != null)
                    {
                        var reservas = hotelesAppSqlContext.Reservas.Where(r => r.HabitacionId == idHabitacion &&
                                                                              ((diaEntrada >= r.FechaEntrada && diaEntrada < r.FechaSalida) ||
                                                                               (diaSalida > r.FechaEntrada && diaSalida <= r.FechaSalida) ||
                                                                               (diaEntrada <= r.FechaEntrada && diaSalida >= r.FechaSalida)))
                                                                     .ToList();
                        if (reservas.Count > 0)
                        {
                            return false;
                        }

                        int? cantidadNochesNulable = CalcularCantidadDeNoches(diaEntrada, diaSalida);
                        if (cantidadNochesNulable.HasValue)
                        {
                            int cantidadNoches = cantidadNochesNulable.Value;
                            decimal totalAPagar = cantidadPersonas * cantidadNoches * habitacion.PrecioNoche;
                            if (cliente.Dinero>=totalAPagar)
                            {
                                cliente.Dinero-=totalAPagar;
                                Reserva reserva = new Reserva();
                                reserva.ClienteCedula = cedula;
                                reserva.HabitacionId = idHabitacion;
                                reserva.FechaEntrada = diaEntrada;
                                reserva.FechaSalida = diaSalida;
                                reserva.PrecioTotal= totalAPagar;
                                hotelesAppSqlContext.Reservas.Add(reserva);
                                hotelesAppSqlContext.SaveChanges();

                                EnviarCorreo(cedula, cantidadPersonas, reserva, diaEntrada, diaSalida);
                                
                                return true;
                            }
                            else
                            {
                                return false;
                            }
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        return false;
                    }
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

        /// <summary>
        /// Verificacion de las fechas de entrada y salida
        /// </summary>
        /// <param name="diaEntrada"></param>
        /// <param name="diaSalida"></param>
        /// <returns></returns>
        public int? CalcularCantidadDeNoches(DateOnly diaEntrada, DateOnly diaSalida)
        {
            DateOnly hoy = DateOnly.FromDateTime(DateTime.Now.Date);

            if (diaEntrada < hoy || diaSalida < hoy)
            {
                return null;
            }

            if (diaSalida <= diaEntrada)
            {
                return null;
            }

            int cantidadNoches = diaSalida.DayNumber - diaEntrada.DayNumber;

            return cantidadNoches;
        }

        /// <summary>
        /// Mostrar el dinero que haya en la cuenta del cliente
        /// </summary>
        /// <param name="cedula"></param>
        /// <returns></returns>
        public decimal MostrarSaldo(string cedula)
        {
            var cliente = SeleccionarPorCedula(cedula);
            return cliente.Dinero;
        }

        /// <summary>
        /// Crear archivo de texto y enviar un correo al cliente
        /// </summary>
        /// <param name="cedula"></param>
        /// <param name="cantidadPersonas"></param>
        /// <param name="reserva"></param>
        /// <param name="diaEntrada"></param>
        /// <param name="diaSalida"></param>
        /// <returns></returns>
        public async Task EnviarCorreo(string cedula, int cantidadPersonas, Reserva reserva, DateOnly diaEntrada, DateOnly diaSalida)
        {
            HotelDAO hotelDAO = new HotelDAO();
            var hotel = hotelDAO.MostrarHotelesDelCliente(cedula).Where(h => h.FechaEntrada == diaEntrada && h.FechaSalida == diaSalida).FirstOrDefault();
            using (StreamWriter archivo = new StreamWriter(@"C:\Users\THERMALTAKE\Desktop\App Hoteles Proyecto\BackEnd\AccesoDatos\ArchivoEnviar\Reserva.txt"))
            {
                archivo.WriteLine("-----------------------HOTELES PAGE---------------------");
                archivo.WriteLine($"Numero de reserva: {reserva.Id}");
                archivo.WriteLine($"Cedula del cliente: {reserva.ClienteCedula}");
                archivo.WriteLine($"Cantidad de personas reservadas en la habitacion: {cantidadPersonas}");
                archivo.WriteLine($"Nombre del hotel: {hotel.Nombre}");
                archivo.WriteLine($"Direccion del hotel: {hotel.Direccion}");
                archivo.WriteLine($"Ciudad: {hotel.Ciudad}");
                archivo.WriteLine($"Numero de la habitacion: {hotel.NumeroHabitacion}");
                archivo.WriteLine($"Tiempo de reserva: {reserva.FechaEntrada} - {reserva.FechaSalida}");
                archivo.WriteLine($"Precio total de la reserva: {reserva.PrecioTotal}");
                archivo.WriteLine("--------------------------------------------------------");
                archivo.WriteLine("IMPORTANTE!: Entregue este documento en recepcion al momento de establecerse en el hotel. En caso de cancelar su reserva se le devolvera el 60% del valor total pagado");
            }

            string EmailOrigen = "appjorgito@gmail.com";
            string EmailDestino = SeleccionarPorCedula(cedula).Email;
            string contrasenia = "lvep jycw wfgm reuo";
            string path = @"C:\Users\THERMALTAKE\Desktop\App Hoteles Proyecto\BackEnd\AccesoDatos\ArchivoEnviar\Reserva.txt";

            MailMessage mailMessage=new MailMessage(EmailOrigen, EmailDestino, "Registro de hotel", "<b>Hemos realizado correctamente su ingreso al hotel!.</b>");
            mailMessage.Attachments.Add(new Attachment(path));
            mailMessage.IsBodyHtml = true;
            SmtpClient smtpClient=new SmtpClient("smtp.gmail.com");
            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Port = 587;
            smtpClient.Credentials = new System.Net.NetworkCredential(EmailOrigen, contrasenia);

            try
            {
                await smtpClient.SendMailAsync(mailMessage);                
            }
            catch (SmtpException smtpEx)
            {
                Console.WriteLine($"SMTP Error: {smtpEx.Message}");
                // Manejar el error de SMTP, por ejemplo, guardando en un log
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}");
                // Manejar otros errores generales
            }
            finally
            {
                smtpClient.Dispose();
                mailMessage.Dispose();
            }

            await Task.Delay(1000);
            try
            {
                if (File.Exists(path))
                {
                    File.Delete(path);
                    Console.WriteLine("Archivo eliminado correctamente.");
                }
            }
            catch (IOException ioEx)
            {
                Console.WriteLine($"Error de IO al intentar eliminar el archivo: {ioEx.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al intentar eliminar el archivo: {ex.Message}");
            }
        }
    }
}
