import mongoose from "mongoose";
import { Alojamiento } from "../entities/Alojamiento.js";
import { Moneda } from "../entities/Moneda.js";
import { Caracteristica } from "../entities/Caracteristica.js";
import { Direccion } from "../entities/Direccion.js";
import { Foto } from "../entities/Foto.js";

const fotoSchema = new mongoose.Schema({
  descripcion: String,
  path: String,
});

fotoSchema.loadClass(Foto);

const direccionSchema = new mongoose.Schema({
  calle: {
    type: String,
    required: true,
  },
  altura: {
    type: Number,
    required: true,
  },
  ciudad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ciudad",
    required: true,
  },
  latitud: {
    type: Number,
    required: true,
  },
  longitud: {
    type: Number,
    required: true,
  },
});

direccionSchema.loadClass(Direccion);

const alojamientoSchema = new mongoose.Schema(
  {
    anfitrion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    descripcion: String,
    precioPorNoche: {
      type: Number,
      required: true,
    },
    moneda: {
      type: String,
      enum: Moneda.getAllAsString(),
      required: true,
    },
    horarioCheckIn: String,
    horarioCheckOut: String,
    direccion: {
      type: direccionSchema,
      required: true,
    },
    cantHuespedesMax: {
      type: Number,
      required: true,
    },
    caracteristicas: [
      {
        type: String,
        enum: Caracteristica.getAllAsString(),
      },
    ],
    reservas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reserva",
      },
    ],
    fotos: [fotoSchema],
  },
  {
    timestamps: true,
    collection: "alojamientos",
  }
);

alojamientoSchema.loadClass(Alojamiento);

export const AlojamientoModel = mongoose.model(
  "Alojamiento",
  alojamientoSchema
);
