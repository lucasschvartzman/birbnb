class EstadoReserva {
  nombre;

  constructor(nombre) {
    this.nombre = nombre;
  }
}

EstadoReserva.PENDIENTE = new EstadoReserva("PENDIENTE");
EstadoReserva.CONFIRMADA = new EstadoReserva("CONFIRMADA");
EstadoReserva.CANCELADA = new EstadoReserva("CANCELADA");
