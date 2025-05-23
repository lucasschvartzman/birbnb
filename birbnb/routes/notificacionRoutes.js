import { NotificacionController } from "../controllers/notificacionController.js";

export function registerNotificacion(app) {
  const controller = new NotificacionController();

  /**
   * @swagger
   * /notificaciones/sin-leer/{usuarioId}:
   *   get:
   *     summary: Obtener notificaciones no leídas de un usuario
   *     tags:
   *       - Notificaciones
   *     parameters:
   *       - in: path
   *         name: usuarioId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del usuario
   *     responses:
   *       200:
   *         description: Lista de notificaciones no leídas
   */
  app.get('/notificaciones/sin-leer/:usuarioId', (req, res) => {
    controller.obtenerNotificacionesSinLeer(req, res);
  });

  /**
   * @swagger
   * /notificaciones/leidas/{usuarioId}:
   *   get:
   *     summary: Obtener notificaciones leídas de un usuario
   *     tags:
   *       - Notificaciones
   *     parameters:
   *       - in: path
   *         name: usuarioId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del usuario
   *     responses:
   *       200:
   *         description: Lista de notificaciones leídas
   */
  app.get('/notificaciones/leidas/:usuarioId', (req, res) => {
    controller.obtenerNotificacionesLeidas(req, res);
  });

  /**
   * @swagger
   * /notificaciones/{notificacionId}/marcar-leida:
   *   put:
   *     summary: Marcar una notificación como leída
   *     tags:
   *       - Notificaciones
   *     parameters:
   *       - in: path
   *         name: notificacionId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID de la notificación
   *     responses:
   *       200:
   *         description: Notificación marcada como leída
   *       404:
   *         description: Notificación no encontrada
   */
  app.put('/notificaciones/:notificacionId/marcar-leida', (req, res) => {
    controller.marcarNotificacionComoLeida(req, res);
  });
}
