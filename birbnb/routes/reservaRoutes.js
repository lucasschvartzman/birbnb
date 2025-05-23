import { ReservaController } from "../controllers/reservaController.js";

export function registerReserva(app, getController) {
  const controller = getController(ReservaController);

  // Crear reserva
  app.post("/reservas", controller.crearReserva.bind(controller));

  // Cancelar reserva ver si es delete
  app.delete("/reservas/:id", controller.cancelarReserva.bind(controller));

  // Modificar reserva
  app.put("/reservas/:id", controller.modificarReserva.bind(controller));

  // Historial de reservas por usuario por email podria ser por ID
  app.get("/reservas/usuario/:email", controller.historialUsuario.bind(controller));
}

