import {NotificacionNoExisteException} from "../exceptions/notificacionExceptions.js";
import {UsuarioNoExisteException} from "../exceptions/usuarioExceptions.js";

export class NotificacionService {

  constructor(notificacionRepository, usuarioModel) {
    this.notificacionRepository = notificacionRepository;
    this.usuarioModel = usuarioModel;
  }

  async obtenerNotificacionesUsuario(idUsuario, filtros) {
    await this.#validarExistenciaUsuario(idUsuario);
    return await this.notificacionRepository.findAll(filtros);
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

  // VALIDACIONES

  #validarDatosNotificacion(idNotificacion, notificacion) {
    if (notificacion == null) {
      throw new NotificacionNoExisteException(idNotificacion);
    }
  }

  async #validarExistenciaUsuario(idUsuario) {
    const usuarioExiste = await this.usuarioModel.exists({_id: idUsuario});
    if (!usuarioExiste) {
      throw new UsuarioNoExisteException(idUsuario);
    }
  }
}
