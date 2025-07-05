import {DatosReservaInvalidosException, ReservaNoExisteException} from "../exceptions/reservaExceptions.js";
import {EstadoReserva} from "../models/entities/EstadoReserva.js";
import {AlojamientoNoExisteException} from "../exceptions/alojamientoExceptions.js";
import {ReservaValidator} from "../validators/ReservaValidator.js";
import {AlojamientoValidator} from "../validators/AlojamientoValidator.js";

export class ReservaService {

  constructor(reservaRepository, alojamientoRepository, notificacionService, usuarioService) {
    this.reservaRepository = reservaRepository;
    this.alojamientoRepository = alojamientoRepository;
    this.notificacionService = notificacionService;
    this.usuarioService = usuarioService;
  }

  async crearReserva(reserva) {
    ReservaValidator.validarValoresCampos(reserva);
    const idAlojamiento = reserva.alojamiento;
    const alojamiento = await this.#obtenerAlojamiento(idAlojamiento);
    this.#validarAlojamiento(alojamiento, reserva);
    const nuevaReserva = {
      ...reserva,
      fechaAlta: new Date(),
      estado: EstadoReserva.PENDIENTE
    }
    const reservaCreada = await this.reservaRepository.create(nuevaReserva);
    await this.notificacionService.generarNotificacionCreacion(nuevaReserva, alojamiento);
    return reservaCreada;
  }

  async cancelarReserva(id, motivo) {
    const reserva = await this.#obtenerReserva(id);
    if (reserva.estaIniciada(new Date())) {
      throw new DatosReservaInvalidosException(`La reserva ya está iniciada.`);
    }
    if (reserva.estaCancelada()) {
      return reserva;
    }
    reserva.actualizarEstado(EstadoReserva.CANCELADA);
    const reservaActualizada = await this.reservaRepository.update(id, reserva);
    await this.notificacionService.generarNotificacionCancelacion(reservaActualizada, motivo);
    return reservaActualizada;
  }

  async modificarReserva(id, reservaModificada) {
    ReservaValidator.validarValoresCampos(reservaModificada);
    const idAlojamiento = reservaModificada.alojamiento;
    const alojamiento = await this.#obtenerAlojamiento(idAlojamiento);
    this.#validarAlojamiento(alojamiento, reservaModificada);
    const reservaActualizada = {
      ...reservaModificada,
      estado: EstadoReserva.PENDIENTE
    }
    return this.reservaRepository.update(id, reservaActualizada);
  }

  async obtenerHistorialPorUsuario(idUsuario) {
    await this.usuarioService.validarExistenciaUsuario(idUsuario);
    return this.reservaRepository.findAll({idUsuario});
  }

  async #obtenerReserva(idReserva) {
    const reserva = await this.reservaRepository.findById(idReserva);
    if (reserva == null) {
      throw new ReservaNoExisteException(idReserva);
    }
    return reserva;
  }

  async #obtenerAlojamiento(idAlojamiento) {
    const alojamiento = await this.alojamientoRepository.findById(idAlojamiento);
    if (alojamiento == null) {
      throw new AlojamientoNoExisteException(idAlojamiento);
    }
    return alojamiento;
  }

  #validarAlojamiento(alojamiento, reserva) {
    AlojamientoValidator.validarDisponibilidad(alojamiento, reserva.rangoFechas);
    AlojamientoValidator.validarCapacidad(alojamiento, reserva.cantidadHuespedes);
  }
}