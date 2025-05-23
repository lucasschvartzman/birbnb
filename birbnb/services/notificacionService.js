export class NotificacionService {
  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  async obtenerNotificaciones(filters) {
    try {
      return await this.notificacionRepository.findAll(filters);
    } catch (error) {
      throw new Error('Error al obtener notificaciones: ' + error.message);
    }
  }

  async marcarComoLeida(notificacionId) {
    try {
      const notificacionActualizada = await this.notificacionRepository.save({
        id: notificacionId,
        leida: true,
        fechaLeida: new Date()
      });

      if (!notificacionActualizada) {
        throw new Error(`Notificación con id ${notificacionId} no encontrada`);
      }

      return notificacionActualizada;
    } catch (error) {
      throw new Error('Error al marcar como leída: ' + error.message);
    }
  }
}
