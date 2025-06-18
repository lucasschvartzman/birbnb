import {NotificacionModel} from "../schemas/notificacionSchema.js";

export class NotificacionRepository {

  constructor() {
    this.model = NotificacionModel;
  }

  async findById(notificacionId) {
    return this.model.findById(notificacionId).populate("usuario");
  }

  async create(notificacion) {
    const nuevaNotificacion = new this.model(notificacion);
    return nuevaNotificacion
      .save()
      .then(doc => doc.populate("usuario"));
  }

  async update(id, datosActualizacion) {
    return this.model
      .findOneAndUpdate(
        {_id: id},
        {$set: datosActualizacion},
        {new: true}
      )
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

