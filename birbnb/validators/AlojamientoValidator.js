import {DatosAlojamientoInvalidosException} from "../exceptions/alojamientoExceptions.js";

export class AlojamientoValidator {
  static validarDisponibilidad(alojamiento, rangoFechas) {
    if (!alojamiento.estaDisponibleEn(rangoFechas)) {
      throw new DatosAlojamientoInvalidosException(`El alojamiento no está disponible en ese rango de fechas.`);
    }
  }
  static validarCapacidad(alojamiento, capacidad) {
    if (!alojamiento.tieneCapacidadPara(capacidad)) {
      throw new DatosAlojamientoInvalidosException(`El alojamiento no tiene capacidad para la cantidad de huespedes solicitada.`);
    }
  }
}