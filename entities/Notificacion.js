class Notificacion {
  mensaje;
  usuario;
  
  constructor(usuario, mensaje) {
    this.mensaje = mensaje;
    this.usuario = usuario;
    this.fechaAlta = new Date();
    this.leida = false;
    this.fechaLeida = null;
  }

  enviarNotificacion() {
    this.usuario.recibirNotificacion(this);
  }

  marcarComoLeida() {
    this.leida = true;
    this.fechaLeida = new Date();
  }
}

export { Notificacion };
