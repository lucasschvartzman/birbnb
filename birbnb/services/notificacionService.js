export class NotificacionService {

  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  async obtenerNotificacionesSinLeer(usuarioId) {
    return this.notificacionRepository.findAll(usuarioId, false);
  }

  async obtenerNotificacionesLeidas(usuarioId) {
    return this.notificacionRepository.findAll(usuarioId, true);
  }

  async marcarNotificacionComoLeida(notificacionId) {
  const resultado = await this.notificacionRepository.save({ id: notificacionId, leida: true });
  if (!resultado) {
    throw new Error('Notificación no encontrada');
  }
  return resultado;
}

}
