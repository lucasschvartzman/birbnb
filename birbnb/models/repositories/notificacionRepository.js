import {NotificacionModel} from "../schemas/notificacionSchema.js";

export class NotificacionRepository {

  constructor() {
    this.model = NotificacionModel;
    this.notificaciones = [];
    this.nextId = 1;
  }

  // TODO: Pasar los metodos a Mongo

  findAll() {
    return this.notificaciones;
  }

  findById(id) {
    return this.notificaciones.find(n => n.id === id);
  }

  findByUsuario(usuario) {
    return this.notificaciones.filter(n => n.usuario === usuario);
  }

  save(notificacion) {
    notificacion.id = this.nextId++;
    this.notificaciones.push(notificacion);
    return notificacion;
  }

  deleteById(id) {
    const index = this.notificaciones.findIndex(n => n.id === id);
    if (index === -1) return false;
    this.notificaciones.splice(index, 1);
    return true;
  }
}