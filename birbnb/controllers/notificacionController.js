export class NotificacionController {

  constructor(notificacionService) {
    this.notificacionService = notificacionService;
  }

  async obtenerNotificacionesSinLeer(req, res) {
    try {
      const usuarioId = req.params.usuarioId;
      const notificaciones = await this.notificacionService.obtenerNotificacionesSinLeer(usuarioId);
      res.status(200).json(notificaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerNotificacionesLeidas(req, res) {
    try {
      const usuarioId = req.params.usuarioId;
      const notificaciones = await this.notificacionService.obtenerNotificacionesLeidas(usuarioId);
      res.status(200).json(notificaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async marcarNotificacionComoLeida(req, res) {
  try {
    const notificacionId = req.params.notificacionId; 
    const resultado = await this.notificacionService.marcarNotificacionComoLeida(notificacionId);
    
    if (!resultado) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }
    res.status(200).json({ mensaje: 'Notificación marcada como leída' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

}
