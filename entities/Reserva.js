class Reserva {
  fechaAlta;
  huespedReservador;
  cantidadHuespedes;
  alojamiento;
  rangoFechas;
  estado;
  precioPorNoche;

  constructor(
    fechaAlta,
    huespedReservador,
    cantidadHuespedes,
    alojamiento,
    rangoFechas,
    precioPorNoche
  ) {
    this.fechaAlta = fechaAlta;
    this.huespedReservador = huespedReservador;
    this.cantidadHuespedes = cantidadHuespedes;
    this.alojamiento = alojamiento;
    this.rangoFechas = rangoFechas;
    this.estado = EstadoReserva.PENDIENTE;
    this.precioPorNoche = precioPorNoche;
  }

  actualizarEstado(estadoReserva) {
    this.estado = estadoReserva;
  }
}
