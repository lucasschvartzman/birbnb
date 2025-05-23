export class NotificacionService {
  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  async findAll(filters) {
    return this.notificacionRepository.findAll(filters);
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
