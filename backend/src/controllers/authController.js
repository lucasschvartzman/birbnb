import {AuthValidator} from "../validators/AuthValidator.js";

export class AuthController {

  constructor(authService) {
    this.authService = authService;
  }

  async iniciarSesion(req, res, next) {
    try {
      AuthValidator.validarCamposRequeridos(req.body);
      const response = await this.authService.iniciarSesion(req.body.email,req.body.password);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}