import { ReservaController } from "../controllers/reservaController.js";

export function registerReserva(app, getController) {
  const controller = getController(ReservaController);

  /**
   * @swagger
   * components:
   *   schemas:
   *     RangoFechas:
   *       type: object
   *       required:
   *         - fechaInicio
   *         - fechaFin
   *       properties:
   *         fechaInicio:
   *           type: string
   *           format: date
   *           description: Fecha de inicio de la reserva
   *           example: "2024-12-25"
   *         fechaFin:
   *           type: string
   *           format: date
   *           description: Fecha de fin de la reserva
   *           example: "2024-12-30"
   *
   *     ReservaRequestDTO:
   *       type: object
   *       required:
   *         - huespedReservador
   *         - cantidadHuespedes
   *         - alojamiento
   *         - rangoFechas
   *         - precioPorNoche
   *       properties:
   *         huespedReservador:
   *           type: string
   *           description: ID del usuario que realiza la reserva
   *           example: "64f1a2b3c4d5e6f7g8h9i0j1"
   *         cantidadHuespedes:
   *           type: integer
   *           minimum: 1
   *           maximum: 20
   *           description: Número de huéspedes para la reserva
   *           example: 2
   *         alojamiento:
   *           type: string
   *           description: ID del alojamiento a reservar
   *           example: "64f1a2b3c4d5e6f7g8h9i0j2"
   *         rangoFechas:
   *           $ref: '#/components/schemas/RangoFechas'
   *         precioPorNoche:
   *           type: number
   *           format: double
   *           minimum: 0
   *           description: Precio por noche en la moneda local
   *           example: 150.50
   *
   *     ReservaResponseDTO:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *           description: ID único de la reserva
   *           example: "64f1a2b3c4d5e6f7g8h9i0j3"
   *         fechaAlta:
   *           type: string
   *           format: date-time
   *           description: Fecha y hora de creación de la reserva
   *           example: "2024-06-01T10:30:00.000Z"
   *         huespedReservadorId:
   *           type: string
   *           description: ID del usuario que realizó la reserva
   *           example: "64f1a2b3c4d5e6f7g8h9i0j1"
   *         cantidadHuespedes:
   *           type: integer
   *           description: Número de huéspedes
   *           example: 2
   *         alojamientoId:
   *           type: string
   *           description: ID del alojamiento reservado
   *           example: "64f1a2b3c4d5e6f7g8h9i0j2"
   *         rangoFechas:
   *           $ref: '#/components/schemas/RangoFechas'
   *         estado:
   *           type: string
   *           enum: [PENDIENTE, CONFIRMADA, INICIADA, FINALIZADA, CANCELADA]
   *           description: Estado actual de la reserva
   *           example: "CONFIRMADA"
   *         precioPorNoche:
   *           type: number
   *           format: double
   *           description: Precio por noche
   *           example: 150.50
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
   *     BadRequest:
   *       description: Solicitud inválida - datos de entrada incorrectos
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ErrorResponse'
   *           example:
   *             status: "fail"
   *             message: "La fecha de inicio debe ser anterior a la fecha de fin"
   *
   *     NotFound:
   *       description: Recurso no encontrado
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ErrorResponse'
   *           example:
   *             status: "fail"
   *             message: "Reserva no encontrada"
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
   * /reservas:
   *   post:
   *     summary: Crear una nueva reserva
   *     description: |
   *       Crea una nueva reserva para un alojamiento específico.
   *       Valida disponibilidad de fechas, capacidad del alojamiento y datos del huésped.
   *     tags:
   *       - Reservas
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ReservaRequestDTO'
   *           examples:
   *             reserva_basica:
   *               summary: Reserva básica
   *               value:
   *                 huespedReservador: "64f1a2b3c4d5e6f7g8h9i0j1"
   *                 cantidadHuespedes: 2
   *                 alojamiento: "64f1a2b3c4d5e6f7g8h9i0j2"
   *                 rangoFechas:
   *                   fechaInicio: "2024-12-25"
   *                   fechaFin: "2024-12-30"
   *                 precioPorNoche: 150.50
   *             reserva_grupo:
   *               summary: Reserva para grupo grande
   *               value:
   *                 huespedReservador: "64f1a2b3c4d5e6f7g8h9i0j1"
   *                 cantidadHuespedes: 8
   *                 alojamiento: "64f1a2b3c4d5e6f7g8h9i0j2"
   *                 rangoFechas:
   *                   fechaInicio: "2024-07-15"
   *                   fechaFin: "2024-07-22"
   *                 precioPorNoche: 220.00
   *     responses:
   *       201:
   *         description: Reserva creada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ReservaResponseDTO'
   *             example:
   *               id: "64f1a2b3c4d5e6f7g8h9i0j3"
   *               fechaAlta: "2024-06-01T10:30:00.000Z"
   *               huespedReservadorId: "64f1a2b3c4d5e6f7g8h9i0j1"
   *               cantidadHuespedes: 2
   *               alojamientoId: "64f1a2b3c4d5e6f7g8h9i0j2"
   *               rangoFechas:
   *                 fechaInicio: "2024-12-25"
   *                 fechaFin: "2024-12-30"
   *               estado: "PENDIENTE"
   *               precioPorNoche: 150.50
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  app.post("/reservas", (req, res, next) => {
    controller.crearReserva(req, res, next);
  });

  /**
   * @swagger
   * /reservas/{id}/cancelar:
   *   patch:
   *     summary: Cancelar una reserva existente
   *     description: |
   *       Cancela una reserva específica. Solo se pueden cancelar reservas en estado PENDIENTE o CONFIRMADA.
   *       El motivo de cancelación es opcional pero recomendado para auditoría.
   *     tags:
   *       - Reservas
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           pattern: '^[0-9a-fA-F]{24}$'
   *         description: ID único de la reserva (formato ObjectId de MongoDB)
   *         example: "64f1a2b3c4d5e6f7g8h9i0j3"
   *       - in: query
   *         name: motivo
   *         required: false
   *         schema:
   *           type: string
   *           maxLength: 500
   *         description: Motivo de la cancelación
   *         examples:
   *           cambio_planes:
   *             summary: Cambio de planes
   *             value: "Cambio de planes de viaje"
   *           emergencia:
   *             summary: Emergencia familiar
   *             value: "Emergencia familiar"
   *           covid:
   *             summary: Motivos de salud
   *             value: "Restricciones de viaje por COVID-19"
   *     responses:
   *       204:
   *         description: Reserva cancelada exitosamente (sin contenido de respuesta)
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  app.patch("/reservas/:id/cancelar", (req, res, next) => {
    controller.cancelarReserva(req, res, next);
  });

  /**
   * @swagger
   * /reservas/{id}:
   *   put:
   *     summary: Modificar una reserva existente
   *     description: |
   *       Modifica los datos de una reserva existente. Solo se pueden modificar reservas en estado PENDIENTE.
   *       Todos los campos son opcionales, pero al menos uno debe ser proporcionado.
   *     tags:
   *       - Reservas
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           pattern: '^[0-9a-fA-F]{24}$'
   *         description: ID único de la reserva (formato ObjectId de MongoDB)
   *         example: "64f1a2b3c4d5e6f7g8h9i0j3"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             minProperties: 1
   *             properties:
   *               huespedReservador:
   *                 type: string
   *                 description: Nuevo ID del usuario que realiza la reserva
   *                 example: "64f1a2b3c4d5e6f7g8h9i0j1"
   *               cantidadHuespedes:
   *                 type: integer
   *                 minimum: 1
   *                 maximum: 20
   *                 description: Nueva cantidad de huéspedes
   *                 example: 3
   *               alojamiento:
   *                 type: string
   *                 description: Nuevo ID del alojamiento (requiere validación de disponibilidad)
   *                 example: "64f1a2b3c4d5e6f7g8h9i0j4"
   *               rangoFechas:
   *                 $ref: '#/components/schemas/RangoFechas'
   *               precioPorNoche:
   *                 type: number
   *                 format: double
   *                 minimum: 0
   *                 description: Nuevo precio por noche
   *                 example: 175.00
   *           examples:
   *             cambiar_fechas:
   *               summary: Cambiar solo las fechas
   *               value:
   *                 rangoFechas:
   *                   fechaInicio: "2024-12-26"
   *                   fechaFin: "2024-12-31"
   *             cambiar_huespedes:
   *               summary: Cambiar cantidad de huéspedes
   *               value:
   *                 cantidadHuespedes: 4
   *             modificacion_completa:
   *               summary: Modificación completa
   *               value:
   *                 cantidadHuespedes: 3
   *                 rangoFechas:
   *                   fechaInicio: "2024-12-27"
   *                   fechaFin: "2024-12-30"
   *                 precioPorNoche: 165.00
   *     responses:
   *       200:
   *         description: Reserva modificada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ReservaResponseDTO'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  app.put("/reservas/:id", (req, res, next) => {
    controller.modificarReserva(req, res, next);
  });

  /**
   * @swagger
   * /usuarios/{idUsuario}/reservas:
   *   get:
   *     summary: Obtener historial de reservas de un usuario
   *     description: |
   *       Recupera todas las reservas realizadas por un usuario específico, ordenadas por fecha de creación descendente.
   *       Incluye reservas en todos los estados (PENDIENTE, CONFIRMADA, INICIADA, FINALIZADA, CANCELADA).
   *     tags:
   *       - Reservas
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
   *         name: estado
   *         required: false
   *         schema:
   *           type: string
   *           enum: [PENDIENTE, CONFIRMADA, INICIADA, FINALIZADA, CANCELADA]
   *         description: Filtrar reservas por estado específico
   *         example: "CONFIRMADA"
   *       - in: query
   *         name: limit
   *         required: false
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 20
   *         description: Número máximo de reservas a retornar
   *         example: 10
   *       - in: query
   *         name: offset
   *         required: false
   *         schema:
   *           type: integer
   *           minimum: 0
   *           default: 0
   *         description: Número de reservas a omitir (para paginación)
   *         example: 0
   *     responses:
   *       200:
   *         description: Lista de reservas del usuario obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/ReservaResponseDTO'
   *                 total:
   *                   type: integer
   *                   description: Total de reservas encontradas
   *                   example: 15
   *                 count:
   *                   type: integer
   *                   description: Cantidad de reservas en esta respuesta
   *                   example: 10
   *             example:
   *               data:
   *                 - id: "64f1a2b3c4d5e6f7g8h9i0j3"
   *                   fechaAlta: "2024-05-15T14:20:00.000Z"
   *                   huespedReservadorId: "64f1a2b3c4d5e6f7g8h9i0j1"
   *                   cantidadHuespedes: 2
   *                   alojamientoId: "64f1a2b3c4d5e6f7g8h9i0j2"
   *                   rangoFechas:
   *                     fechaInicio: "2024-12-25"
   *                     fechaFin: "2024-12-30"
   *                   estado: "CONFIRMADA"
   *                   precioPorNoche: 150.50
   *                 - id: "64f1a2b3c4d5e6f7g8h9i0j4"
   *                   fechaAlta: "2024-04-10T09:15:00.000Z"
   *                   huespedReservadorId: "64f1a2b3c4d5e6f7g8h9i0j1"
   *                   cantidadHuespedes: 4
   *                   alojamientoId: "64f1a2b3c4d5e6f7g8h9i0j5"
   *                   rangoFechas:
   *                     fechaInicio: "2024-08-01"
   *                     fechaFin: "2024-08-07"
   *                   estado: "FINALIZADA"
   *                   precioPorNoche: 220.00
   *               total: 15
   *               count: 2
   *       400:
   *         $ref: '#/components/responses/BadRequest'
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
  app.get("/usuarios/:idUsuario/reservas", (req, res, next) => {
    return controller.obtenerHistorialUsuario(req, res, next);
  });
}