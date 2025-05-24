import mongoose from "mongoose";
import { Notificacion } from "../entities/Notificacion.js";

const notificacionSchema = new mongoose.Schema(
  {
    mensaje: {
      type: String,
      required: true,
      trim: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    fechaAlta: {
      type: Date,
      required: true,
    },
    leida: {
      type: Boolean,
      required: true,
    },
    fechaLeida: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "notificaciones",
  }
);

notificacionSchema.loadClass(Notificacion);

export const NotificacionModel = mongoose.model(
  "Notificacion",
  notificacionSchema
);
