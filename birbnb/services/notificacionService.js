export class NotificacionService {
  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  async findAll(filters) {
    try {
      return await this.notificacionRepository.findAll(filters);
    } catch (error) {
      throw new Error('Error al obtener notificaciones: ' + error.message);
    }
  }

  async marcarComoLeida(notificacionId) {
    try {

      const notificacion = await this.notificacionRepository.findById(notificacionId);

      if (notificacion.leida) {
        return notificacion;
      } else {
        notificacion.marcarComoLeida();

        const notificacionActualizada = await this.notificacionRepository.save(notificacion);

        if (!notificacionActualizada) {
          throw new Error(`Notificación con id ${notificacionId} no encontrada`);
        }

        return notificacionActualizada;
      }
    } catch (error) {
      throw new Error('Error al marcar como leída: ' + error.message);
    }
  }
}
