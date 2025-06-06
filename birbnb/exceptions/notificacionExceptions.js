import { AppException } from "./appExceptions.js";

export class NotificacionNoExisteException extends AppException {
    constructor(idNotificacion) {
        super(`La notificacion con id ${idNotificacion} no existe`, 404);
    }
}