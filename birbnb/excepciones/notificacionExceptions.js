import { AppException } from "./appExceptions.js";

export class NotificacionNoExisteException extends AppException {
    constructor(idNotificacion) {
        super(`La reserva con id ${idNotificacion} no existe`, 404);
    }
}