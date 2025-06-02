import {
  DatosReservaInvalidosException,
  ReservaNoExisteException
} from "../excepciones/reservaExceptions.js";
import { EstadoReserva } from "../models/entities/EstadoReserva.js";
import { NotificacionFactory } from "../models/entities/NotificacionFactory.js";
import { UsuarioModel } from "../models/schemas/usuarioSchema.js";

export class ReservaService {
  constructor(reservaRepository, alojamientoRepository, notificacionRepository) {
    this.reservaRepository = reservaRepository;
    this.alojamientoRepository = alojamientoRepository;
    this.notificacionRepository = notificacionRepository;
  }

  async crearReserva(reserva) {
    const alojamiento = await this.alojamientoRepository.findById(reserva.alojamiento);
    this.#validarDatosAlojamientoReserva(reserva, alojamiento);
    await this.#generarNotificacionCreacion(reserva, alojamiento);
    return this.reservaRepository.save({
      ...reserva,
      fechaAlta: new Date(),
      estado: EstadoReserva.PENDIENTE.nombre
    });
  }

  async cancelarReserva(id, motivo) {
    const reserva = await this.reservaRepository.findById(id);
    this.#validarDatosReserva(reserva,id);
    await this.#generarNotificacionCancelacion(reserva,motivo);
    reserva.actualizarEstado(EstadoReserva.CANCELADA.nombre);
    return this.reservaRepository.save(reserva);
  }

  async modificarReserva(id, reservaModificada) {
    const alojamiento = await this.alojamientoRepository.findById(reservaModificada.alojamiento);
    this.#validarDatosAlojamientoReserva(reservaModificada, alojamiento);
    return this.reservaRepository.save({
      id: id,
      estado: EstadoReserva.PENDIENTE.nombre,
      ...reservaModificada
    })
  }

  async obtenerHistorialPorUsuario(idUsuario) {
    return this.reservaRepository.findAll({ idUsuario });
  }

  // VALIDACIONES

  #validarDatosAlojamientoReserva(reserva, alojamiento) {
    if (alojamiento == null) {
      throw new DatosReservaInvalidosException(`El alojamiento que se quiere reservar no existe.`);
    }
    if (!alojamiento.estaDisponibleEn(reserva.rangoFechas)) {
      throw new DatosReservaInvalidosException(`El alojamiento no está disponible en ese rango de fechas.`);
    }
    if (!alojamiento.tieneCapacidadPara(reserva.cantidadHuespedes)) {
      throw new DatosReservaInvalidosException(`El alojamiento no tiene capacidad para la cantidad de huespedes solicitada.`);
    }
  }

  #validarDatosReserva(reserva,id) {
    if (reserva == null) {
      throw new ReservaNoExisteException(id);
    }
    if (reserva.estaIniciada()) {
      throw new DatosReservaInvalidosException(`La reserva ya está iniciada.`);
    }
  }

  // MÉTODOS AUXILIARES

  #toNotificacionSchema(notificacion) {
    return {
      mensaje: notificacion.mensaje,
      usuario: notificacion.usuario._id,
      fechaAlta: notificacion.fechaAlta,
      leida: notificacion.leida,
      fechaLeida: notificacion.fechaLeida
    }
  }

  async #generarNotificacionCreacion(reserva, alojamiento) {
    const huespedReservador = await UsuarioModel.findById(reserva.huespedReservador);
    const notificacionCreacion = NotificacionFactory.crearNotificacionReservaCreada({
      huesped: huespedReservador.nombre,
      alojamiento: alojamiento.nombre,
      fechaInicio: reserva.rangoFechas.fechaInicio,
      cantidadDias: reserva.rangoFechas.cantidadDias(),
      anfitrion: alojamiento.anfitrion
    });
    this.notificacionRepository.save(this.#toNotificacionSchema(notificacionCreacion));
  }

  async #generarNotificacionCancelacion(reserva, motivo) {
    const huespedReservador = await UsuarioModel.findById(reserva.huespedReservador);
    const alojamiento = await this.alojamientoRepository.findById(reserva.alojamiento);
    const notificacionCancelacion = NotificacionFactory.crearNotificacionReservaCancelada({
      huesped: huespedReservador.nombre,
      alojamiento: alojamiento.nombre,
      fechaInicio: reserva.fechaInicio,
      motivo: motivo,
      anfitrion: alojamiento.anfitrion
    });
    return this.notificacionRepository.save(this.#toNotificacionSchema(notificacionCancelacion))
  }
}
