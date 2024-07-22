using System;
using System.Collections.Generic;

namespace AccesoDatos.Models;

public partial class Reserva
{
    public int Id { get; set; }

    public string ClienteCedula { get; set; } = null!;

    public int HabitacionId { get; set; }

    public DateOnly FechaEntrada { get; set; }

    public DateOnly FechaSalida { get; set; }

    public decimal PrecioTotal { get; set; }

    public virtual Cliente ClienteCedulaNavigation { get; set; } = null!;

    public virtual Habitacion Habitacion { get; set; } = null!;
}
