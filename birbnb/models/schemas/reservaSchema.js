import mongoose from 'mongoose';
import {Reserva} from "../entities/Reserva.js";

const reservaSchema = new mongoose.Schema({
// TODO: Definir Schema.
});

reservaSchema.loadClass(Reserva);

export const ReservaModel = mongoose.model('Reserva', reservaSchema);