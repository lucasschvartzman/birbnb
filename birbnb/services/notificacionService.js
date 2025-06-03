import {NotificacionNoExisteException} from "../exceptions/notificacionExceptions.js";

export class NotificacionService {
  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  async obtenerNotificacionesUsuario(filtros) {
    return await this.notificacionRepository.findAll(filtros);
  }

  #validarDatosNotificacion(idNotificacion, notificacion) {
    if (notificacion == null) {
      throw new NotificacionNoExisteException(idNotificacion);
    }
  }

  async marcarComoLeida(idNotificacion) {
    const notificacion = await this.notificacionRepository.findById(idNotificacion);
    this.#validarDatosNotificacion(idNotificacion,notificacion);
    if (notificacion.estaLeida()) {
      return notificacion; // Si ya está leída, no hacemos nada.
    }
    notificacion.marcarComoLeida();
    return await this.notificacionRepository.save(notificacion);
  }
}
