import { NotificacionModel } from "../schemas/notificacionSchema.js";

export class NotificacionRepository {

  constructor() {
    this.model = NotificacionModel;
  }

  async findById(notificacionId) {
    return this.model.findById(notificacionId).populate("usuario");
  }

  async save(notificacion) {
    const query = notificacion.id
      ? { _id: notificacion.id }
      : { _id: new this.model()._id };

    return this.model
      .findOneAndUpdate(query, notificacion, { new: true, upsert: true })
      .populate("usuario");
  }

  #armarQuery(filtros) {
    const query = {};
    if (filtros.idUsuario) {
      query.usuario = filtros.idUsuario;
    }
    if (filtros.leida !== undefined) {
      query.leida = filtros.leida;
    }
    return query;
  }

  async findAll(filtros = {}) {
    return this.model.find(this.#armarQuery(filtros)).populate("usuario");
  }

}

