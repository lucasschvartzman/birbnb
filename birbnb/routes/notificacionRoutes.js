import { NotificacionController } from "../controllers/notificacionController.js";

export function registerNotificacion(app, getController) {
  /**
   * @swagger
   * /notificaciones/{usuarioId}:
   *   get:
   *     summary: Obtener notificaciones de un usuario
   *     tags:
   *       - Notificaciones
   *     parameters:
   *       - in: path
   *         name: usuarioId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del usuario
   *       - in: query
   *         name: leida
   *         schema:
   *           type: boolean
   *         description: Filtro para ver si la notificación fue leída o no
   *     responses:
   *       200:
   *         description: Lista de notificaciones filtradas
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   mensaje:
   *                     type: string
   *                   leida:
   *                     type: boolean
   *                   fecha:
   *                     type: string
   *                     format: date-time
   */
  app.get("/notificaciones/:usuarioId", (req, res) => {
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
   *         description: Notificación actualizada correctamente
   *       404:
   *         description: Notificación no encontrada
   */
  app.patch("/notificaciones/:notificacionId/leida", (req, res) =>
    getController(NotificacionController).marcarComoLeida(req, res)
  );
}
