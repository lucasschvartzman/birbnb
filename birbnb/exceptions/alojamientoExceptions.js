import { AppException } from "./appExceptions.js";

export class AlojamientoNoExisteException extends AppException {
  constructor(idAlojamiento) {
    super(`El alojamiento con id ${idAlojamiento} no existe`, 404);
  }
}

export class DatosAlojamientoInvalidosException extends AppException {
  constructor(idAlojamiento) {
    super(400,idAlojamiento);
  }
}

export class FiltrosAlojamientoInvalidosException extends AppException {
  constructor(errores) {
    super("Errores de validación en los parámetros", 400);
    this.errors = errores;
  }
}