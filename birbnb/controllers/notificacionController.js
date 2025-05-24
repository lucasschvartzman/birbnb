export class NotificacionController {
  constructor(notificacionService) {
    this.notificacionService = notificacionService;
  }

  async findAll(req, res) {
    try {
      const filters = {};
      if (req.params.usuarioId) {
        filters.idUsuario = req.params.usuarioId;
      }
      if (req.query.leida !== undefined) {
        filters.leida = req.query.leida;
      }
      const notificaciones = await this.notificacionService.findAll(filters);
      res.json(notificaciones);
    } catch (error) {
    }
  }

  async marcarComoLeida(req, res) {

    const notificacionActualizada = await this.notificacionService.marcarComoLeida(req.params.notificacionId);

    if (!notificacionActualizada) {
      throw new Error(`Notificación con id ${notificacionId} no encontrada`);
    }

    res.json(notificacionActualizada);
  }

}
