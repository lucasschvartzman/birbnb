// controllers/reservaController.js
import { ReservaInvalida, ReservaNoExiste } from "../excepciones/reservas.js";

// —————— DTOs ——————
//ACA DEVOLVERIA UN OBJETO SE PUEDE USAR LA FUNCION DE LUCAS!!
const aReservaRest = (reserva) => ({
  id: reserva.id,
  huespedReservador: reserva.huespedReservador,
  cantidadHuespedes: reserva.cantidadHuespedes,
  alojamiento: reserva.alojamiento,
  rangoFechas: {
    desde: reserva.rangoFechas.desde,
    hasta: reserva.rangoFechas.hasta,
  },
  estado: reserva.estado,
  precioPorNoche: reserva.precioPorNoche,
  fechaAlta: reserva.fechaAlta,
});

const deReservaRest = (body) => {

  return {
    huespedReservador: body.huespedReservador,
    cantidadHuespedes: body.cantidadHuespedes,
    alojamiento: body.alojamientoId,
    rangoFechas: {
      desde: new Date(body.rangoFechas.desde),
      hasta: new Date(body.rangoFechas.hasta),
    },
    precioPorNoche: body.precioPorNoche,
  };
};

// —————— CONTROLADOR ——————

export class ReservaController {
  reservaService

  constructor(reservaService) {
    this.reservaService = reservaService;
  }

  async crearReserva(req, res) {
    try {
      const dto = deReservaRest(req.body);
      const nueva = await this.reservaService.crearReserva(dto);
      res.status(201).json(aReservaRest(nueva));
    } catch (error) {
      console.error(error);
      if (error instanceof ReservaInvalida) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error interno" });
      }
    }
  }

  async cancelarReserva(req, res) {
    try {
      await this.reservaService.cancelarReserva(
        req.params.id,
        req.body.motivo
      );
      res.status(204).send();
    } catch (error) {
      console.error(error);
      if (error instanceof ReservaInvalida) {
        res.status(400).json({ error: error.message });
      } else if (error instanceof ReservaNoExiste) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error interno :___(" });
      }
    }
  }

  async modificarReserva(req, res) {
    try {
      const dto = deReservaRest(req.body);
      const actualizada = await this.reservaService.modificarReserva(
        req.params.id,
        dto
      );
      res.status(200).json(aReservaRest(actualizada));
    } catch (error) {
      console.error(error);
      if (error instanceof ReservaInvalida) {
        res.status(400).json({ error: error.message });
      } else if (error instanceof ReservaNoExiste) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error interno" });
      }
    }
  }

  async historialUsuario(req, res) {
    try {
      const lista = await this.reservaService.obtenerHistorialPorUsuario(
        req.params.email
      );
      res.status(200).json(lista.map(aReservaRest));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno pipipi :___(" });
    }
  }
}

