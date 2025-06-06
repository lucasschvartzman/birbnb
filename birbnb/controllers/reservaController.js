import { RangoFechas } from "../models/entities/RangoFechas.js";

const fromDto = (body) => {
  return {
    huespedReservador: body.huespedReservador,
    cantidadHuespedes: body.cantidadHuespedes,
    alojamiento: body.alojamiento,
    rangoFechas:  new RangoFechas(
        body.rangoFechas.fechaInicio,
        body.rangoFechas.fechaFin
    ),
    precioPorNoche: body.precioPorNoche
  }
}

const toDto = (reserva) => {
  return {
    id : reserva._id,
    fechaAlta: reserva.fechaAlta,
    huespedReservadorId: reserva.huespedReservador._id,
    cantidadHuespedes: reserva.cantidadHuespedes,
    alojamientoId: reserva.alojamiento._id,
    rangoFechas: {
      fechaInicio: reserva.rangoFechas.fechaInicio,
      fechaFin: reserva.rangoFechas.fechaFin
    },
    estado: reserva.estado.nombre,
    precioPorNoche: reserva.precioPorNoche
  }
}

export class ReservaController {

  constructor(reservaService) {
    this.reservaService = reservaService;
  }

  async crearReserva(req, res, next) {
    try {
      const reservaDto = fromDto(req.body);
      const nuevaReserva = await this.reservaService.crearReserva(reservaDto);
      res.status(201).json(toDto(nuevaReserva));
    } catch (error) {
      next(error);
    }
  }

  async cancelarReserva(req, res, next) {
    try {
      const reserva = await this.reservaService.cancelarReserva(req.params.id, req.body.motivo);
      res.status(204).json(toDto(reserva));
    } catch (error) {
      next(error);
    }
  }

  async modificarReserva(req, res, next) {
    try {
      const reservaDto = fromDto(req.body);
      const reservaActualizada = await this.reservaService.modificarReserva(req.params.id, reservaDto);
      res.json(toDto(reservaActualizada));
    } catch (error) {
      next(error);
    }
  }

  async obtenerHistorialUsuario(req, res, next) {
    try {
      const historialReservas = await this.reservaService.obtenerHistorialPorUsuario(req.params.id);
      res.json(historialReservas.map(toDto));
    } catch (error) {
      next(error);
    }
  }
}
