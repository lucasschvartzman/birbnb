import { NotificacionRepository } from '../repositories/notificacionRepository.js';
import { Notificacion } from '../entities/Notificacion.js';


class NotificacionController {
  constructor() {
    this.notificacionRepository = new NotificacionRepository();
  }

  getAllNotificaciones = (req, res) => {
    const notificaciones = this.notificacionRepository.findAll();
    res.json(notificaciones);
  };

  createNotificacion = (req, res) => {
    const { usuario, mensaje } = req.body;

    if (!usuario || !mensaje) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    const nuevaNotificacion = new Notificacion(usuario, mensaje);
    const notificacionGuardada = this.notificacionRepository.save(nuevaNotificacion);

    res.status(201).json(notificacionGuardada);
  };

  marcarComoLeida = (req, res) => {
    const id = Number(req.params.id);
    const notificacion = this.notificacionRepository.findById(id);

    if (!notificacion) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }

    notificacion.marcarComoLeida();
    res.json(notificacion);
  };

  deleteNotificacion = (req, res) => {
    const id = Number(req.params.id);
    const eliminado = this.notificacionRepository.deleteById(id);

    if (!eliminado) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }

    res.status(204).send();
  };
}
export { NotificacionController };
