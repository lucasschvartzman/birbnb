import {AuthController} from "../controllers/authController.js";

export function registerAuth(app, getController) {
  const controller = getController(AuthController);

  app.post("/login", (req, res, next) => {
    controller.iniciarSesion(req, res, next);
  });

}
