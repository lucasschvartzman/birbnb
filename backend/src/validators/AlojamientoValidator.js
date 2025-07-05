import {
  DatosAlojamientoInvalidosException,
  FiltrosAlojamientoInvalidosException
} from "../exceptions/alojamientoExceptions.js";
import mongoose from "mongoose";

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

  static validarQueryParameters(queryParameters) {
    const errores = [];
    if (queryParameters.idCiudad && !mongoose.Types.ObjectId.isValid(queryParameters.idCiudad)) {
      errores.push(this.#obtenerMensajeIdInvalido("ciudad", queryParameters.idCiudad));
    }
    if (queryParameters.idPais && !mongoose.Types.ObjectId.isValid(queryParameters.idPais)) {
      errores.push(this.#obtenerMensajeIdInvalido("pais", queryParameters.idPais));
    }
    if (queryParameters.precioMinimo && !this.#esNumeroPositivo(queryParameters.precioMinimo)) {
      errores.push(this.#obtenerMensajeNumeroNoEnteroPositivo("precioMinimo", queryParameters.precioMinimo));
    }
    if (queryParameters.precioMaximo && !this.#esNumeroPositivo(queryParameters.precioMaximo)) {
      errores.push(this.#obtenerMensajeNumeroNoEnteroPositivo("precioMaximo", queryParameters.precioMaximo));
    }
    const precioMinimo = queryParameters.precioMinimo ? parseFloat(queryParameters.precioMinimo) : null;
    const precioMaximo = queryParameters.precioMaximo ? parseFloat(queryParameters.precioMaximo) : null;
    if (precioMinimo !== null && precioMaximo !== null && precioMinimo > precioMaximo) {
      errores.push(`El 'precioMinimo': ${precioMinimo} no puede ser mayor que el 'precioMaximo': ${precioMaximo}.`);
    }
    if (queryParameters.latitud && isNaN(queryParameters.latitud)) {
      errores.push(this.#obtenerMensajeStringInvalido("latitud", queryParameters.latitud));
    }
    if (queryParameters.longitud && isNaN(queryParameters.longitud)) {
      errores.push(this.#obtenerMensajeStringInvalido("longitud", queryParameters.longitud));
    }
    if (queryParameters.huespedes) {
      const cantidadHuespedes = parseInt(queryParameters.huespedes);
      if (!this.#esNumeroPositivo(queryParameters.huespedes) || !Number.isInteger(cantidadHuespedes)) {
        errores.push(this.#obtenerMensajeNumeroNoEnteroPositivo("huespedes", queryParameters.huespedes));
      }
    }
    if (queryParameters.caracteristicas && !this.#esStringValido(queryParameters.caracteristicas)) {
      errores.push(this.#obtenerMensajeStringInvalido("caracteristicas", queryParameters.caracteristicas));
    }
    if (errores.length > 0) {
      throw new FiltrosAlojamientoInvalidosException(errores);
    }
    return true;
  }

  static #esStringValido(valor) {
    return typeof valor === "string" && valor.trim().length !== 0;
  }

  static #esNumeroPositivo(valor) {
    return !isNaN(valor) && valor > 0;
  }

  static #obtenerMensajeStringInvalido(parametro, valor) {
    return `El parámetro '${parametro}': '${valor}' debe ser un string válido.`;
  }

  static #obtenerMensajeIdInvalido(parametro, valor) {
    return `El parámetro '${parametro}': '${valor}' debe ser un ObjectId válido.`;
  }

  static #obtenerMensajeNumeroNoEnteroPositivo(parametro, valor) {
    return `El parámetro '${parametro}': '${valor}' debe ser un número positivo válido.`;
  }
}