export class Reserva {

  constructor(
    fechaAlta,
    huespedReservador,
    cantidadHuespedes,
    alojamiento,
    rangoFechas,
    estado,
    precioPorNoche
  ) {
    this.fechaAlta = fechaAlta;
    this.huespedReservador = huespedReservador;
    this.cantidadHuespedes = cantidadHuespedes;
    this.alojamiento = alojamiento;
    this.rangoFechas = rangoFechas;
    this.estado = estado;
    this.precioPorNoche = precioPorNoche;
  }

  actualizarEstado(estadoReserva) {
    this.estado = estadoReserva;
  }

  estaVigenteEn(rangoDeFechas) {
    return this.rangoFechas.seSuperponeCon(rangoDeFechas);
  }

  estaIniciada(fecha) {
    return this.rangoFechas.incluye(fecha);
  }
}