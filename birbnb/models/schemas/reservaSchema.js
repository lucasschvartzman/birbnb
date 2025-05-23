import mongoose from "mongoose";
import { Reserva } from "../entities/Reserva.js";

const rangoFechasSchema = new mongoose.Schema({
  desde: Date,
  hasta: Date,
});

const reservaSchema = new mongoose.Schema({
  fechaAlta: { type: Date, required: true },
  huespedReservador: {
    nombre: String,
    email: String,
    tipo: String,
  },
  cantidadHuespedes: Number,
  alojamiento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alojamiento",
  },
  rangoFechas: rangoFechasSchema,
  estado: { type: String, enum: ["PENDIENTE", "CONFIRMADA", "CANCELADA"] },
  precioPorNoche: Number,
});

reservaSchema.loadClass(Reserva);

export const ReservaModel = mongoose.model("Reserva", reservaSchema);
