export class ReservaException extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.esOperacional = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class DatosReservaInvalidosException extends ReservaException {
  constructor(message) {
    super(message,400);
  }
}

export class ReservaNoExisteException extends ReservaException {
  constructor(idReserva) {
    super(`La reserva con id ${idReserva} no existe`, 404);
  }
}