import {NotificacionNoExisteException} from "../exceptions/notificacionExceptions.js";
import {NotificacionFactory} from "../models/factories/NotificacionFactory.js";
import {AlojamientoNoExisteException} from "../exceptions/alojamientoExceptions.js";
import {UsuarioNoExisteException} from "../exceptions/usuarioExceptions.js";

export class NotificacionService {

  constructor(notificacionRepository, alojamientoRepository, usuarioService) {
    this.notificacionRepository = notificacionRepository;
    this.usuarioService = usuarioService;
    this.alojamientoRepository = alojamientoRepository;
  }

  // Métodos utilizados por el controller

  async obtenerNotificacionesUsuario(idUsuario, filtros) {
    await this.usuarioService.validarExistenciaUsuario(idUsuario);
    return await this.notificacionRepository.findAll(filtros);
  }

  async marcarComoLeida(idNotificacion) {
    const notificacion = await this.#obtenerNotificacion(idNotificacion);
    if (notificacion.estaLeida()) {
      return notificacion;
    }
    notificacion.marcarComoLeida();
    return await this.notificacionRepository.update(idNotificacion, notificacion);
  }

  // Métodos para generar notificaciones:

  async generarNotificacionCreacion(reserva, alojamiento) {
    const datosNotificacionCreacion = await this.#obtenerDatosNotificacionCreacion(reserva, alojamiento);
    const notificacionCreacion = NotificacionFactory.crearNotificacionReservaCreada(datosNotificacionCreacion);
    return this.notificacionRepository.create(notificacionCreacion);
  }

  async generarNotificacionCancelacion(reserva, motivo) {
    const datosNotificacionCancelacion = await this.#obtenerDatosNotificacionCancelacion(reserva, motivo);
    const notificacionCancelacion = NotificacionFactory.crearNotificacionReservaCancelada(datosNotificacionCancelacion);
    return this.notificacionRepository.create(notificacionCancelacion)
  }

  // Métodos auxiliares

  async #obtenerDatosNotificacionCreacion(reserva, alojamiento) {
    const idHuespedReservador = reserva.huespedReservador;
    const huespedReservador = await this.usuarioService.obtenerUsuarioPorId(idHuespedReservador);
    if (!huespedReservador) {
      throw new UsuarioNoExisteException(idHuespedReservador)
    }
    return {
      huesped: huespedReservador.nombre,
      alojamiento: alojamiento.nombre,
      fechaInicio: reserva.rangoFechas.fechaInicio,
      cantidadDias: reserva.rangoFechas.calcularCantidadDias(),
      anfitrion: alojamiento.anfitrion
    }
  }

  async #obtenerDatosNotificacionCancelacion(reserva, motivo) {
    const idHuespedReservador = reserva.huespedReservador;
    const huespedReservador = await this.usuarioService.obtenerUsuarioPorId(idHuespedReservador);
    if (!huespedReservador) {
      throw new UsuarioNoExisteException(idHuespedReservador)
    }
    const alojamiento = await this.alojamientoRepository.findById(reserva.alojamiento);
    if (alojamiento == null) {
      throw new AlojamientoNoExisteException(reserva.alojamiento);
    }
    return {
      huesped: huespedReservador.nombre,
      alojamiento: alojamiento.nombre,
      fechaInicio: reserva.rangoFechas.fechaInicio,
      motivo: motivo,
      anfitrion: alojamiento.anfitrion
    }
  }

  async #obtenerNotificacion(idNotificacion) {
    const notificacion = await this.notificacionRepository.findById(idNotificacion);
    if (notificacion == null) {
      throw new NotificacionNoExisteException(idNotificacion);
    }
    return notificacion;
  }
}
