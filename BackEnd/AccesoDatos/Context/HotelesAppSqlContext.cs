using System;
using System.Collections.Generic;
using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace AccesoDatos.Context;

public partial class HotelesAppSqlContext : DbContext
{
    public HotelesAppSqlContext()
    {
    }

    public HotelesAppSqlContext(DbContextOptions<HotelesAppSqlContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Habitacion> Habitacions { get; set; }

    public virtual DbSet<Hotel> Hotels { get; set; }

    public virtual DbSet<Reserva> Reservas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-GQKIT69\\SQLEXPRESS;Database=HotelesAppSql;Trust Server Certificate=true;User Id=proJAHM;Password=projahm123;MultipleActiveResultSets=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.Cedula).HasName("PK__Cliente__415B7BE448EC86C0");

            entity.ToTable("Cliente");

            entity.Property(e => e.Cedula)
                .HasMaxLength(50)
                .HasColumnName("cedula");
            entity.Property(e => e.Contrasenia)
                .HasMaxLength(100)
                .HasColumnName("contrasenia");
            entity.Property(e => e.Dinero)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("dinero");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .HasColumnName("telefono");
        });

        modelBuilder.Entity<Habitacion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Habitaci__3213E83F48F00897");

            entity.ToTable("Habitacion");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.HotelId).HasColumnName("hotelId");
            entity.Property(e => e.NumeroHabitacion).HasColumnName("numeroHabitacion");
            entity.Property(e => e.PrecioNoche)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("precioNoche");
            entity.Property(e => e.Tipo)
                .HasMaxLength(50)
                .HasColumnName("tipo");

            entity.HasOne(d => d.Hotel).WithMany(p => p.Habitacions)
                .HasForeignKey(d => d.HotelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Habitacio__hotel__4222D4EF");
        });

        modelBuilder.Entity<Hotel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Hotel__3213E83F9A2CC592");

            entity.ToTable("Hotel");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Ciudad)
                .HasMaxLength(100)
                .HasColumnName("ciudad");
            entity.Property(e => e.Direccion)
                .HasMaxLength(255)
                .HasColumnName("direccion");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.NumeroEstrellas).HasColumnName("numeroEstrellas");
        });

        modelBuilder.Entity<Reserva>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Reserva__3213E83F88F95636");

            entity.ToTable("Reserva");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ClienteCedula)
                .HasMaxLength(50)
                .HasColumnName("clienteCedula");
            entity.Property(e => e.FechaEntrada).HasColumnName("fechaEntrada");
            entity.Property(e => e.FechaSalida).HasColumnName("fechaSalida");
            entity.Property(e => e.HabitacionId).HasColumnName("habitacionId");
            entity.Property(e => e.PrecioTotal)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("precioTotal");

            entity.HasOne(d => d.ClienteCedulaNavigation).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.ClienteCedula)
                .HasConstraintName("FK__Reserva__cliente__3E52440B");

            entity.HasOne(d => d.Habitacion).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.HabitacionId)
                .HasConstraintName("FK_Reserva_Habitacion");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
