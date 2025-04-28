export class RangoFechas {
  constructor(fechaInicio, fechaFin) {
    this.fechaInicio = new Date(fechaInicio);
    this.fechaFin = new Date(fechaFin);
  }

  seSuperponeCon(rangoDeFechas) {
    return (
      this.fechaInicio <= rangoDeFechas.fechaFin &&
      this.fechaFin >= rangoDeFechas.fechaInicio
    );
  }
}
