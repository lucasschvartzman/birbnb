export class Alojamiento {
  constructor(
    anfitrion,
    nombre,
    descripcion,
    precioPorNoche,
    moneda,
    horarioCheckIn,
    horarioCheckOut,
    direccion,
    cantHuespedesMax,
  ) {
    this.anfitrion = anfitrion;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioPorNoche = precioPorNoche;
    this.moneda = moneda;
    this.horarioCheckIn = horarioCheckIn;
    this.horarioCheckOut = horarioCheckOut;
    this.direccion = direccion;
    this.cantHuespedesMax = cantHuespedesMax;
    this.caracteristicas = [];
    this.reservas = [];
    this.fotos = [];
  }

  estaDisponibleEn(rangoDeFechas) {
    const reserva = this.reservas.find((reserva) =>
      reserva.rangoDeFechas.seSuperponeCon(rangoDeFechas)
    );
    return reserva === undefined
    //return !reserva;
  }

  suPrecioEstaDentroDe(valorMinimo, valorMaximo) {
    return (
      this.precioPorNoche >= valorMinimo && this.precioPorNoche <= valorMaximo
    );
  }

  tieneCaracteristica(caracteristica) {
    return this.caracteristicas.includes(caracteristica);
  }

  puedenAlojarse(cantHuespedes) {
    return cantHuespedes <= this.cantHuespedesMax;
  }

  agregarReserva(reserva) {
    this.reservas.push(reserva);
  }
}
