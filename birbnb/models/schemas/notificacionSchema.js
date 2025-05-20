import mongoose from 'mongoose';
import { Notificacion } from "../entities/Notificacion.js";

const notificacionSchema = new mongoose.Schema({
// TODO: Definir Schema.
});

notificacionSchema.loadClass(Notificacion);

export const NotificacionModel = mongoose.model('Notificacion', notificacionSchema);