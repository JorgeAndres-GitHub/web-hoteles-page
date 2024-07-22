using System;
using System.Collections.Generic;

namespace AccesoDatos.Models;

public partial class Cliente
{
    public string Cedula { get; set; } = null!;

    public string Contrasenia { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public decimal Dinero { get; set; }

    public virtual ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}
