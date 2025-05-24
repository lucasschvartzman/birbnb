import { NotificacionController } from "../controllers/notificacionController.js";

export function registerNotificacion(app, getController) {

  /**
   * @swagger
   * /notificaciones/sin-leer/{usuarioId}:
   *   get:
   *     summary: Obtener notificaciones de un usuario segun parametros
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
  app.get('/notificaciones/:usuarioId', (req, res) => {
    getController(NotificacionController).findAll(req, res);
  });

  /**
   * @swagger
   * /notificaciones/{notificacionId}/leida:
   *   patch:
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
  app.patch('/notificaciones/:notificacionId/leida', (req, res) =>
  getController(NotificacionController).marcarComoLeida(req, res)
  );

}
