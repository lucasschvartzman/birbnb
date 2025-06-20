import {AuthValidator} from "../validators/AuthValidator.js";

export class AuthController {

  constructor(authService) {
    this.authService = authService;
  }

  async iniciarSesion(req, res, next) {
    try {
      AuthValidator.validarCamposRequeridos(req.body);
      const id = await this.authService.iniciarSesion(req.body.email,req.body.password);
      res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  }
}