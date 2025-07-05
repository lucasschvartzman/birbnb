import {DatosReservaInvalidosException} from "../exceptions/reservaExceptions.js";

export class ReservaValidator {
  static validarCamposRequeridos(body) {
    if (!body.rangoFechas) {
      throw new DatosReservaInvalidosException("El rango de fechas es requerido");
    }
    if (!body.rangoFechas.fechaInicio) {
      throw new DatosReservaInvalidosException("La fecha de inicio es requerida");
    }
    if (!body.rangoFechas.fechaFin) {
      throw new DatosReservaInvalidosException("La fecha de fin es requerida");
    }
    if (!body.cantidadHuespedes) {
      throw new DatosReservaInvalidosException("La cantidad de huéspedes es requerida");
    }
    if (!body.precioPorNoche) {
      throw new DatosReservaInvalidosException("El precio por noche es requerido");
    }
    if (!body.alojamiento) {
      throw new DatosReservaInvalidosException("El alojamiento es requerido");
    }
  }
  static validarValoresCampos(reserva) {
    // Validamos que los campos numéricos sean números:
    if (typeof reserva.cantidadHuespedes !== 'number') {
      throw new DatosReservaInvalidosException("La cantidad de huéspedes debe ser un número.");
    }
    if (typeof reserva.precioPorNoche !== 'number') {
      throw new DatosReservaInvalidosException("El precio por noche debe ser un número.");
    }
    // Validamos que los campos numéricos sean positivos:
    if (reserva.cantidadHuespedes <= 0) {
      throw new DatosReservaInvalidosException("La cantidad de huéspedes debe ser un número mayor a 0.");
    }
    if (reserva.precioPorNoche <= 0) {
      throw new DatosReservaInvalidosException("El precio por noche debe ser un número mayor a 0.");
    }
    // Validamos que las fechas tengan el formato correcto
    const fechaInicio = new Date(reserva.rangoFechas.fechaInicio);
    const fechaFin = new Date(reserva.rangoFechas.fechaFin);
    if (isNaN(fechaInicio.getTime())) {
      throw new DatosReservaInvalidosException("La fecha de inicio no es válida.");
    }
    if (isNaN(fechaFin.getTime())) {
      throw new DatosReservaInvalidosException("La fecha de fin no es válida.");
    }
    // Validamos que las fechas tengan valores coherentes
    const fechaActual = new Date();
    if (fechaInicio >= fechaFin) {
      throw new DatosReservaInvalidosException("La fecha de inicio debe ser anterior a la fecha de fin.");
    }
    if (fechaInicio < fechaActual) {
      throw new DatosReservaInvalidosException("La fecha de inicio no puede ser en el pasado.");
    }
  }
}