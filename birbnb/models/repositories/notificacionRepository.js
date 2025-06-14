import { NotificacionModel } from "../schemas/notificacionSchema.js";

export class NotificacionRepository {

  constructor() {
    this.model = NotificacionModel;
  }

  async findById(notificacionId) {
    return this.model.findById(notificacionId).populate("usuario");
  }

  // En este save están acopladas las ideas de crear una notificacion
  // y modificarla (marcarla como leida por ej), lo cual ocasiona que
  // tengan que hacer esa creación de id a manopla y además genera un
  // bug: si te llega la instrucción de marcar como leída una notificación
  // que no existe, en vez de tirar error te la va a crear!
  // Debería haber dos methods diferentes, uno solo para crear, y uno solo para editar
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

