import mongoose from "mongoose";
import { Ciudad } from "../entities/Ciudad";

const ciudadSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true },
    pais: { type: mongoose.Schema.Types.ObjectId, ref: "Pais", required: true },
  },
  {
    timestamps: true,
    collection: "ciudades",
  }
);

ciudadSchema.loadClass(Ciudad);

export const CiudadModel = mongoose.model("Ciudad", ciudadSchema);
