import { AppException } from "./appExceptions.js";

export class DatosAuthInvalidosException extends AppException {
  constructor(message) {
    super(message,400);
  }
}

export class CredencialesIncorrectasException extends AppException {
  constructor() {
    super("Las credenciales son incorrectas",404)
  }
}