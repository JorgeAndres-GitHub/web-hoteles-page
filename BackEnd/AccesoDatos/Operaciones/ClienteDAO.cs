using AccesoDatos.Context;
using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public decimal MostrarSaldo(string cedula)
        {
            var cliente = SeleccionarPorCedula(cedula);
            return cliente.Dinero;
        }
    }
}
