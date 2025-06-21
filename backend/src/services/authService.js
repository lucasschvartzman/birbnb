import {CredencialesIncorrectasException} from "../exceptions/authExceptions.js";

export class AuthService {

  constructor(usuarioService) {
    this.usuarioService = usuarioService;
  }

  async iniciarSesion(email, password) {
    const usuario = await this.usuarioService.obtenerUsuarioPorEmailYPassword(email, password);
    if (!usuario) {
      throw new CredencialesIncorrectasException();
    }
    return {
      id: usuario._id,
      nombre: usuario.nombre
    };
  }
}