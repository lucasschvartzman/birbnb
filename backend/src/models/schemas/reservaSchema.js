import mongoose from "mongoose";
import { Reserva } from "../entities/Reserva.js";
import { RangoFechas } from "../entities/RangoFechas.js";
import { EstadoReserva } from "../entities/EstadoReserva.js";

const rangoFechasSchema = new mongoose.Schema({
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    required: true,
  },
});

rangoFechasSchema.loadClass(RangoFechas);

const reservaSchema = new mongoose.Schema(
  {
    fechaAlta: {
      type: Date,
      required: true,
    },
    huespedReservador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    cantidadHuespedes: {
      type: Number,
      required: true,
    },
    alojamiento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alojamiento",
      required: true,
    },
    rangoFechas: {
      type: rangoFechasSchema,
      required: true,
    },
    estado: {
      type: String,
      enum: EstadoReserva.getAllAsString(),
      required: true,
      set: (value) => (value?.nombre) || value,
      get: (value) => (typeof value === "string") ? EstadoReserva.getByNombre(value) : value
    },
    precioPorNoche: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "reservas",
  }
);

reservaSchema.loadClass(Reserva);

export const ReservaModel = mongoose.model("Reserva", reservaSchema);
