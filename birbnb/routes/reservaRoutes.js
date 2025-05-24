import { ReservaController } from "../controllers/reservaController.js";

export function registerReserva(app, getController) {
  const controller = getController(ReservaController);

  /**
   * @swagger
   * /reservas:
   *   post:
   *     summary: Crear una nueva reserva
   *     tags:
   *       - Reservas
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               huespedReservador:
   *                 type: string
   *               cantidadHuespedes:
   *                 type: integer
   *               alojamientoId:
   *                 type: string
   *               rangoFechas:
   *                 type: object
   *                 properties:
   *                   desde:
   *                     type: string
   *                     format: date
   *                   hasta:
   *                     type: string
   *                     format: date
   *               precioPorNoche:
   *                 type: number
   *     responses:
   *       201:
   *         description: Reserva creada exitosamente
   *       400:
   *         description: Datos inválidos
   *       500:
   *         description: Error interno
   */
  app.post("/reservas", controller.crearReserva.bind(controller));

  /**
   * @swagger
   * /reservas/{id}:
   *   delete:
   *     summary: Cancelar una reserva
   *     tags:
   *       - Reservas
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID de la reserva
   *       - in: query
   *         name: motivo
   *         schema:
   *           type: string
   *         description: Motivo de cancelación
   *     responses:
   *       200:
   *         description: Reserva cancelada correctamente
   *       400:
   *         description: Error de validación
   *       404:
   *         description: Reserva no encontrada
   *       500:
   *         description: Error interno
   */
  app.delete("/reservas/:id", controller.cancelarReserva.bind(controller));

  /**
   * @swagger
   * /reservas/{id}:
   *   put:
   *     summary: Modificar una reserva existente
   *     tags:
   *       - Reservas
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               huespedReservador:
   *                 type: string
   *               cantidadHuespedes:
   *                 type: integer
   *               alojamientoId:
   *                 type: string
   *               rangoFechas:
   *                 type: object
   *                 properties:
   *                   desde:
   *                     type: string
   *                     format: date
   *                   hasta:
   *                     type: string
   *                     format: date
   *               precioPorNoche:
   *                 type: number
   *     responses:
   *       200:
   *         description: Reserva modificada exitosamente
   *       400:
   *         description: Error de validación
   *       404:
   *         description: Reserva no encontrada
   *       500:
   *         description: Error interno
   */
  app.put("/reservas/:id", controller.modificarReserva.bind(controller));

  /**
   * @swagger
   * /reservas/usuario/{idUsuario}:
   *   get:
   *     summary: Obtener historial de reservas de un usuario
   *     tags:
   *       - Reservas
   *     parameters:
   *       - in: path
   *         name: idUsuario
   *         required: true
   *         schema:
   *           type: string
   *         description: ID del usuario
   *     responses:
   *       200:
   *         description: Lista de reservas del usuario
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   huespedReservador:
   *                     type: string
   *                   cantidadHuespedes:
   *                     type: number
   *                   alojamiento:
   *                     type: string
   *                   rangoFechas:
   *                     type: object
   *                     properties:
   *                       desde:
   *                         type: string
   *                       hasta:
   *                         type: string
   *                   estado:
   *                     type: string
   *                   precioPorNoche:
   *                     type: number
   *                   fechaAlta:
   *                     type: string
   *                     format: date-time
   *       500:
   *         description: Error interno
   */
  app.get(
    "/reservas/usuario/:idUsuario",
    controller.historialUsuario.bind(controller)
  );
}
