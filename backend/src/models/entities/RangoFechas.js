export class RangoFechas {
  constructor(fechaInicio, fechaFin) {
    this.fechaInicio = new Date(fechaInicio);
    this.fechaFin = new Date(fechaFin);
  }

  seSuperponeCon(rangoDeFechas) {
    return (
      this.fechaInicio < rangoDeFechas.fechaFin &&
      this.fechaFin > rangoDeFechas.fechaInicio
    );
  }

  incluye(fecha) {
    return fecha >= this.fechaInicio && fecha <= this.fechaFin;
  }

  calcularCantidadDias() {
    const milisegundosPorDia = 24 * 60 * 60 * 1000;
    const diferenciaMilisegundosEntreFechas = this.fechaFin.getTime() - this.fechaFin.getTime();
    return Math.ceil(diferenciaMilisegundosEntreFechas / milisegundosPorDia);
  }
}
