import { NotificacionModel } from "../schemas/notificacionSchema.js";

export class NotificacionRepository {

  constructor() {
    this.model = NotificacionModel;
  }

  async save(notificacion) {
    const query = notificacion.id
      ? { _id: notificacion.id }
      : { _id: new this.model()._id };

    return this.model
      .findOneAndUpdate(query, notificacion, { new: true, upsert: true })
      .populate("usuario");
  }

  async findAll(filters = {}) {
    const query = {};
    if (filters.idUsuario) {
      query.usuario = filters.idUsuario;
    }
    if (filters.leida !== undefined) {
      query.leida = filters.leida;
    }
    return this.model.find(query).populate("usuario");
  }

}

