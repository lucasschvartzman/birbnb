import { DatosReservaInvalidosException, ReservaNoExisteException } from "../exceptions/reservaExceptions.js";
import { EstadoReserva } from "../models/entities/EstadoReserva.js";
import { AlojamientoNoExisteException } from "../exceptions/alojamientoExceptions.js";

export class ReservaService {

  constructor(reservaRepository, alojamientoRepository, notificacionService, usuarioService) {
    this.reservaRepository = reservaRepository;
    this.alojamientoRepository = alojamientoRepository;
    this.notificacionService = notificacionService;
    this.usuarioService = usuarioService;
  }

  async crearReserva(reserva) {
    const alojamiento = await this.alojamientoRepository.findById(reserva.alojamiento);
    this.#validarDatosAlojamientoReserva(reserva, alojamiento);
    await this.notificacionService.generarNotificacionCreacion(reserva, alojamiento);
    return this.reservaRepository.save({
      ...reserva,
      fechaAlta: new Date(),
      estado: EstadoReserva.PENDIENTE
    });
  }

  async cancelarReserva(id, motivo) {
    const reserva = await this.reservaRepository.findById(id);
    this.#validarDatosReserva(reserva,id);
    await this.notificacionService.generarNotificacionCancelacion(reserva,motivo);
    reserva.actualizarEstado(EstadoReserva.CANCELADA);
    return this.reservaRepository.save(reserva)
  }

  async modificarReserva(id, reservaModificada) {
    const alojamiento = await this.alojamientoRepository.findById(reservaModificada.alojamiento);
    this.#validarDatosAlojamientoReserva(reservaModificada, alojamiento);
    return this.reservaRepository.save({
      id: id,
      estado: EstadoReserva.PENDIENTE,
      ...reservaModificada
    })
  }

  async obtenerHistorialPorUsuario(idUsuario) {
    await this.usuarioService.validarExistenciaUsuario(idUsuario);
    return this.reservaRepository.findAll({ idUsuario });
  }

  #validarDatosAlojamientoReserva(reserva, alojamiento) {
    if (alojamiento == null) {
      throw new AlojamientoNoExisteException(reserva.alojamiento.id);
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
    if (reserva.estaIniciada(new Date())) {
      throw new DatosReservaInvalidosException(`La reserva ya está iniciada.`);
    }
  }
}
