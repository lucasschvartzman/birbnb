import { NotificacionController } from "../controllers/notificacionController.js";

export function registerNotificacion(app, getController) {
  const controller = getController(NotificacionController);

  /**
   * @swagger
   * components:
   *   schemas:
   *     NotificacionResponseDTO:
   *       type: object
   *       properties:
   *         mensaje:
   *           type: string
   *           description: Contenido del mensaje de la notificación
   *           example: "Tu reserva ha sido confirmada para el 25 de diciembre"
   *         usuario:
   *           type: string
   *           description: ID del usuario destinatario de la notificación
   *           example: "64f1a2b3c4d5e6f7g8h9i0j1"
   *         fechaAlta:
   *           type: string
   *           format: date-time
   *           description: Fecha y hora de creación de la notificación
   *           example: "2024-06-01T10:30:00.000Z"
   *         leida:
   *           type: boolean
   *           description: Indica si la notificación ha sido leída
   *           example: false
   *         fechaLeida:
   *           type: string
   *           format: date-time
   *           nullable: true
   *           description: Fecha y hora en que se marcó como leída (null si no ha sido leída)
   *           example: null
   *
   *     ErrorResponse:
   *       type: object
   *       properties:
   *         status:
   *           type: string
   *           enum: [error, fail]
   *           description: Tipo de respuesta de error
   *         message:
   *           type: string
   *           description: Mensaje descriptivo del error
   *         error:
   *           type: object
   *           description: Detalles adicionales del error (solo en desarrollo)
   *
   *   responses:
   *     NotFound:
   *       description: Recurso no encontrado
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ErrorResponse'
   *           example:
   *             status: "fail"
   *             message: "Notificación no encontrada"
   *
   *     InternalServerError:
   *       description: Error interno del servidor
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ErrorResponse'
   *           example:
   *             status: "error"
   *             message: "Error interno del servidor"
   */

  /**
   * @swagger
   * /usuarios/{idUsuario}/notificaciones:
   *   get:
   *     summary: Obtener notificaciones de un usuario
   *     description: |
   *       Recupera todas las notificaciones de un usuario específico, ordenadas por fecha de creación descendente.
   *       Incluye tanto notificaciones leídas como no leídas.
   *     tags:
   *       - Notificaciones
   *       - Usuarios
   *     parameters:
   *       - in: path
   *         name: idUsuario
   *         required: true
   *         schema:
   *           type: string
   *           pattern: '^[0-9a-fA-F]{24}$'
   *         description: ID único del usuario (formato ObjectId de MongoDB)
   *         example: "64f1a2b3c4d5e6f7g8h9i0j1"
   *       - in: query
   *         name: leida
   *         required: false
   *         schema:
   *           type: boolean
   *         description: Filtrar notificaciones por estado de lectura
   *         examples:
   *           no_leidas:
   *             summary: Solo no leídas
   *             value: false
   *           leidas:
   *             summary: Solo leídas
   *             value: true
   *     responses:
   *       200:
   *         description: Lista de notificaciones del usuario (con o sin leer) obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/NotificacionResponseDTO'
   *             example:
   *               data:
   *                 - mensaje: "Nueva reserva realizada por Ana López sobre el alojamiento Villa Las Flores para el 2024-12-25 (7 días)."
   *                   usuario: "64f1a2b3c4d5e6f7g8h9i0j1"
   *                   fechaAlta: "2024-06-01T10:30:00.000Z"
   *                   leida: false
   *                   fechaLeida: null
   *                 - mensaje: "El huésped Juan Carlos canceló la reserva del alojamiento Departamento en Palermo para el 2024-12-09. Motivo: No tengo el dinero para pagarlo."
   *                   usuario: "64f1a2b3c4d5e6f7g8h9i0j1"
   *                   fechaAlta: "2024-05-31T18:00:00.000Z"
   *                   leida: false
   *                   fechaLeida: null
   *       404:
   *         description: Usuario no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *             example:
   *               status: "fail"
   *               message: "Usuario no encontrado"
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  app.get("/usuarios/:idUsuario/notificaciones", (req, res, next) => {
    controller.obtenerNotificacionesUsuario(req, res, next);
  });

  /**
   * @swagger
   * /notificaciones/{idNotificacion}/leida:
   *   patch:
   *     summary: Marcar notificación como leída
   *     description: |
   *       Marca una notificación específica como leída, estableciendo la fecha y hora actual.
   *       Si la notificación ya estaba marcada como leída, no se realizan cambios.
   *     tags:
   *       - Notificaciones
   *     parameters:
   *       - in: path
   *         name: idNotificacion
   *         required: true
   *         schema:
   *           type: string
   *           pattern: '^[0-9a-fA-F]{24}$'
   *         description: ID único de la notificación (formato ObjectId de MongoDB)
   *         example: "64f1a2b3c4d5e6f7g8h9i0j3"
   *     responses:
   *       200:
   *         description: Notificación marcada como leída exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotificacionResponseDTO'
   *             example:
   *               mensaje: "Nueva reserva realizada por Ana López sobre el alojamiento Villa Las Flores para el 2024-12-25 (7 días)."
   *               usuario: "64f1a2b3c4d5e6f7g8h9i0j1"
   *               fechaAlta: "2024-06-01T10:30:00.000Z"
   *               leida: true
   *               fechaLeida: "2024-06-03T15:45:00.000Z"
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  app.patch("/notificaciones/:idNotificacion/leida", (req, res, next) => {
    controller.marcarComoLeida(req, res, next);
  });
}