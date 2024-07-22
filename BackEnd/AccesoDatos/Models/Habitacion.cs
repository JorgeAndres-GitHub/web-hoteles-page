using System;
using System.Collections.Generic;

namespace AccesoDatos.Models;

public partial class Habitacion
{
    public int Id { get; set; }

    public int NumeroHabitacion { get; set; }

    public string Tipo { get; set; } = null!;

    public decimal PrecioNoche { get; set; }

    public int HotelId { get; set; }

    public virtual Hotel Hotel { get; set; } = null!;

    public virtual ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}
