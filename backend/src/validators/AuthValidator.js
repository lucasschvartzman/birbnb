import {DatosAuthInvalidosException} from "../exceptions/authExceptions.js";

export class AuthValidator {
  static validarCamposRequeridos(body) {
    if (!body.email) {
      throw new DatosAuthInvalidosException("El email es requerido");
    }
    if (!body.password) {
      throw new DatosAuthInvalidosException("La password es requerida");
    }
  }
}