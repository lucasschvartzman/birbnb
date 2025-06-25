import { AppException } from "./appExceptions.js";

export class UsuarioNoExisteException extends AppException {
    constructor(idUsuario) {
        super(`El usuario con id ${idUsuario} no existe`, 404);
    }
}