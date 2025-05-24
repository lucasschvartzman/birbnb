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
    caracteristicas,
    reservas,
    fotos
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
    this.caracteristicas = caracteristicas;
    this.reservas = reservas;
    this.fotos = fotos;
  }

  estaDisponibleEn(rangoDeFechas) {
    const ningunaVigente = this.reservas.every((reserva) => !reserva.estaVigenteEn(rangoDeFechas));
    return ningunaVigente

  }

  suPrecioEstaDentroDe(valorMinimo, valorMaximo) {
    return (
      this.precioPorNoche >= valorMinimo && this.precioPorNoche <= valorMaximo
    );
  }

  tieneCaracteristica(caracteristica) {
    return this.caracteristicas.includes(caracteristica);
  }

  tieneCapacidadPara(cantHuespedes) {
    return cantHuespedes <= this.cantHuespedesMax;
  }

  agregarReserva(reserva) {
    this.reservas.push(reserva);
  }
}
