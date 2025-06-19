import { registerAlojamiento } from "./alojamientoRoutes.js";
import { registerReserva } from "./reservaRoutes.js";
import { registerNotificacion } from "./notificacionRoutes.js";
import { registerHealthCheck } from "./healthCheckRoutes.js";

export function registerRoutes(app, getController) {
  registerHealthCheck(app, getController);
  registerAlojamiento(app, getController);
  registerReserva(app, getController);
  registerNotificacion(app, getController);
}
