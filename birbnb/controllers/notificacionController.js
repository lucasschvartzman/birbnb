export class NotificacionController {
  constructor(notificacionService) {
    this.notificacionService = notificacionService;
  }

  async findAll(req, res, next) {
    try {
      const filters = {};
      if (req.params.usuarioId) {
        filters.idUsuario = req.params.usuarioId;
      }
      if (req.path.includes('sin-leer')) {
        filters.leida = false;
      } else if (req.path.includes('leidas')) {
        filters.leida = true;
      }
      const notificaciones = await this.notificacionService.findAll(filters);
      res.json(notificaciones);
    } catch (error) {
      next(error);
    }
  }

  async marcarComoLeida(req, res, next) {
  try {
    const notificacionId = req.params.id;
    const notificacionActualizada = await this.notificacionService.marcarComoLeida({
      id: notificacionId,
      leida: true,
      fechaLeida: new Date()
    });

    if (!notificacionActualizada) {
      return res.status(404).json({ error: `Notificación con id ${notificacionId} no encontrada` });
    }

    res.status(200).json(notificacionActualizada);
  } catch (error) {
    next(error);
  }
  }
}
