import { AppException } from "./appExceptions.js";

export class DatosReservaInvalidosException extends AppException {
  constructor(message) {
    super(message,400);
  }
}

export class ReservaNoExisteException extends AppException {
  constructor(idReserva) {
    super(`La reserva con id ${idReserva} no existe`, 404);
  }
}
