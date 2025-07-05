import { ReservaModel } from "../schemas/reservaSchema.js";

export class ReservaRepository {
  constructor() {
    this.model = ReservaModel;
  }

  async findById(id) {
    return this.model
      .findById(id)
      .populate("huespedReservador")
      .populate("alojamiento");
  }

  async create(reserva) {
    const nuevaReserva = new this.model(reserva);
    return nuevaReserva
      .save()
      .then(doc => doc.populate("huespedReservador"))
      .then(doc => doc.populate("alojamiento"));
  }

  async update(id, reserva) {
    return this.model
      .findOneAndUpdate(
        { _id: id },
        { $set: reserva },
        { new: true }
      )
      .populate("huespedReservador")
      .populate("alojamiento");
  }

  #armarQuery(filtros) {
    const query = {};
    if (filtros.idUsuario) {
      query.huespedReservador = filtros.idUsuario;
    }
    return query;
  }

  async findAll(filtros = {}) {
    return this.model
      .find(this.#armarQuery(filtros))
      .populate("huespedReservador")
      .populate("alojamiento");
  }
}
