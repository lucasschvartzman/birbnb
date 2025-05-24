import { ReservaInvalida, ReservaNoExiste } from "../excepciones/reservas.js";
import { EstadoReserva } from "../models/entities/EstadoReserva.js";

export class ReservaService {
  constructor(reservaRepository, alojamientoRepository) {
    this.reservaRepository = reservaRepository;
    // FIXME llamar al service, NO al repository
    this.alojamientoRepository = alojamientoRepository;
  }

  async crearReserva(datos) {
    const alojamiento = await this.alojamientoRepository.findById(
      datos.alojamiento
    );
    if (!alojamiento) {
      // FIXME NO usar ReservaNoExiste cuando lo q no existe es un alojamiento
      throw new ReservaNoExiste("Alojamiento no existe");
    } else {
      if (!alojamiento.estaDisponibleEn(datos.rangoFechas)) {
        throw new ReservaInvalida("Alojamiento no disponible en esas fechas");
      } else if (!alojamiento.tieneCapacidadPara(datos.cantidadHuespedes)) {
        throw new ReservaInvalida(
          "Alojamiento no tiene capacidad para la cantidad de huespedes solicitada"
        );
      } else {
        // TODO CREAR NOTIFICACION ALTA
        return this.reservaRepository.save({
          ...datos,
          fechaAlta: new Date(),
          estado: EstadoReserva.PENDIENTE.nombre,
        });
      }
    }
  }

  async cancelarReserva(id, motivo) {
    const reserva = await this.reservaRepository.findById(id);
    if (reserva.estaIniciada(new Date())) {
      throw new ReservaInvalida(
        "La reserva ya esta iniciada, no puede cancelarse"
      );
    } else {
      // TODO CREAR NOTIFICACION CANCELACION
      reserva.actualizarEstado(EstadoReserva.CANCELADA.nombre);

      const reservaObj = reserva.toObject();
      delete reservaObj._id;
      return this.reservaRepository.save({
        ...reservaObj,
        id: reserva.id,
      });
    }
  }

  async modificarReserva(id, cambios) {
    const alojamiento = await this.alojamientoRepository.findById(
      cambios.alojamiento
    );
    if (!alojamiento) {
      // FIXME NO usar ReservaNoExiste cuando lo q no existe es un alojamiento
      throw new ReservaNoExiste("Alojamiento no existe");
    } else {
      if (!alojamiento.estaDisponibleEn(cambios.rangoFechas)) {
        throw new ReservaInvalida("Alojamiento no disponible en esas fechas");
      } else if (!alojamiento.tieneCapacidadPara(cambios.cantidadHuespedes)) {
        throw new ReservaInvalida(
          "Alojamiento no tiene capacidad para la cantidad de huespedes solicitada"
        );
      } else {
        return this.reservaRepository.save({
          ...cambios,
          id,
          estado: EstadoReserva.PENDIENTE.nombre,
        });
      }
    }
  }

  async obtenerHistorialPorUsuario(idUsuario) {
    return this.reservaRepository.findAll({ idUsuario });
  }
}
