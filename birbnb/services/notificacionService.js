import {NotificacionNoExisteException} from "../exceptions/notificacionExceptions.js";
import {NotificacionFactory} from "../models/factories/NotificacionFactory.js";
import { AlojamientoNoExisteException } from "../exceptions/alojamientoExceptions.js";

export class NotificacionService {

  constructor(notificacionRepository, alojamientoRepository, usuarioService) {
    this.notificacionRepository = notificacionRepository;
    this.usuarioService = usuarioService;
    this.alojamientoRepository = alojamientoRepository;
  }

  async obtenerNotificacionesUsuario(idUsuario, filtros) {
    await this.usuarioService.validarExistenciaUsuario(idUsuario);
    return await this.notificacionRepository.findAll(filtros);
  }

  async marcarComoLeida(idNotificacion) {
    const notificacion = await this.notificacionRepository.findById(idNotificacion);
    this.#validarDatosNotificacion(idNotificacion,notificacion);
    if (notificacion.estaLeida()) {
      return notificacion;
    }
    notificacion.marcarComoLeida();
    return await this.notificacionRepository.save(notificacion);
  }

  #validarDatosNotificacion(idNotificacion, notificacion) {
    if (notificacion == null) {
      throw new NotificacionNoExisteException(idNotificacion);
    }
  }
  #validarExistenciaAlojamiento(idAlojamiento, alojamiento) {
    if (!alojamiento) {
      throw new AlojamientoNoExisteException(idAlojamiento);
    }
    return alojamiento;
  }

  async generarNotificacionCreacion(reserva, alojamiento) {
    const huespedReservador = await this.usuarioService.obtenerUsuarioPorId(reserva.huespedReservador);
    const notificacionCreacion = NotificacionFactory.crearNotificacionReservaCreada({
      huesped: huespedReservador.nombre,
      alojamiento: alojamiento.nombre,
      fechaInicio: reserva.rangoFechas.fechaInicio,
      cantidadDias: reserva.rangoFechas.calcularCantidadDias(),
      anfitrion: alojamiento.anfitrion
    });
    await this.notificacionRepository.save(this.#toNotificacionSchema(notificacionCreacion));
  }

  async generarNotificacionCancelacion(reserva, motivo) {
    const huespedReservador = await this.usuarioService.obtenerUsuarioPorId(reserva.huespedReservador);
    const alojamiento = await this.alojamientoRepository.findById(reserva.alojamiento);
    this.#validarExistenciaAlojamiento(reserva.alojamiento, alojamiento);

    const notificacionCancelacion = NotificacionFactory.crearNotificacionReservaCancelada({
      huesped: huespedReservador.nombre,
      alojamiento: alojamiento.nombre,
      fechaInicio: reserva.fechaInicio,
      motivo: motivo,
      anfitrion: alojamiento.anfitrion
    });
    return await this.notificacionRepository.save(this.#toNotificacionSchema(notificacionCancelacion))
  }

  #toNotificacionSchema(notificacion) {
    return {
      mensaje: notificacion.mensaje,
      usuario: notificacion.usuario._id,
      fechaAlta: notificacion.fechaAlta,
      leida: notificacion.leida,
      fechaLeida: notificacion.fechaLeida
    }
  }
}
