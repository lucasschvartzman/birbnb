import { AppException } from "./appExceptions.js";

export class AlojamientoNoExisteException extends AppException {
  constructor(idAlojamiento) {
    super(`El alojamiento con id ${idAlojamiento} no existe`, 404);
  }
}
