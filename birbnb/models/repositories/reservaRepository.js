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

  async save(reserva) {
    const query = reserva.id
      ? { _id: reserva.id }
      : { _id: new this.model()._id };

    return this.model
      .findOneAndUpdate(query, reserva, {
        new: true,
        upsert: true
      })
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
