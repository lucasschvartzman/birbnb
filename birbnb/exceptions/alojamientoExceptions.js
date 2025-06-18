import { AppException } from "./appExceptions.js";

export class AlojamientoNoExisteException extends AppException {
  constructor(idAlojamiento) {
    super(`El alojamiento con id ${idAlojamiento} no existe`, 404);
  }
}

export class FiltrosAlojamientoInvalidosException extends AppException {
  constructor(errores) {
    super(`Errores de validación en los parámetros: ${errores}`, 400);
  }
}