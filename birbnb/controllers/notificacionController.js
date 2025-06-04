const toDto = (notificacion) => {
    return {
        id: notificacion._id,
        mensaje: notificacion.mensaje,
        usuario: notificacion.usuario._id,
        fechaAlta: notificacion.fechaAlta,
        leida: notificacion.leida,
        fechaLeida: notificacion.fechaLeida
    }
}

export class NotificacionController {
  constructor(notificacionService) {
    this.notificacionService = notificacionService;
  }

  #armarFiltrosBusqueda(req) {
      const filtros = {};
      if (req.params.idUsuario) {
          filtros.idUsuario = req.params.idUsuario;
      }
      if (req.query.leida !== undefined) {
          filtros.leida = req.query.leida;
      }
      return filtros;
  }

  async obtenerNotificacionesUsuario(req, res, next) {
    try {
      const filtros = this.#armarFiltrosBusqueda(req);
      const notificacionesUsuario = await this.notificacionService.obtenerNotificacionesUsuario(req.params.idUsuario,filtros);
      res.json(notificacionesUsuario.map(toDto));
    } catch (error) {
        next(error);
    }
  }

  async marcarComoLeida(req, res, next) {
      try {
          const notificacionActualizada = await this.notificacionService.marcarComoLeida(req.params.idNotificacion);
          res.json(toDto(notificacionActualizada));
      } catch (error) {
          next(error);
      }
  }

}
