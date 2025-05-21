import mongoose from 'mongoose';
import { Alojamiento } from "../entities/Alojamiento.js";

const alojamientoSchema = new mongoose.Schema({
// TODO: Definir Schema.
});

alojamientoSchema.loadClass(Alojamiento);

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);