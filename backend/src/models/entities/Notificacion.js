export class Notificacion {

  constructor(usuario, mensaje, fechaAlta, leida, fechaLeida) {
    this.mensaje = mensaje;
    this.usuario = usuario;
    this.fechaAlta = fechaAlta;
    this.leida = leida;
    this.fechaLeida = fechaLeida;
  }
  
  marcarComoLeida() {
    this.leida = true;
    this.fechaLeida = new Date();
  }

  estaLeida() {
    return this.leida;
  }
}