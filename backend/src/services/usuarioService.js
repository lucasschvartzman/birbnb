import { UsuarioNoExisteException } from "../exceptions/usuarioExceptions.js";

export class UsuarioService {

  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async obtenerUsuarioPorId(idUsuario) {
    return await this.usuarioRepository.findById(idUsuario);
  }

  async obtenerUsuarioPorEmailYPassword(email, password) {
    return this.usuarioRepository.findByEmailAndPassword(email, password);
  }

  async validarExistenciaUsuario(idUsuario) {
    const usuarioExiste = await this.usuarioRepository.existsById(idUsuario);
    if (!usuarioExiste) {
      throw new UsuarioNoExisteException(idUsuario);
    }
    return usuarioExiste;
  }
}