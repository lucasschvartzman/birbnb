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

  cantidadDias() {
    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    return Math.ceil((this.fechaInicio - this.fechaFin) / milisegundosPorDia);
  }
}
