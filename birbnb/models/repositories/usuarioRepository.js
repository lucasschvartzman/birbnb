import { UsuarioModel } from '../schemas/usuarioSchema.js';

export class UsuarioRepository {

    constructor() {
        this.model = UsuarioModel;
    }

    async findById(usuarioId) {
        return this.model.findById(usuarioId);
    }

    async existsById(idUsuario) {
        return this.model.exists({_id: idUsuario});
    }
}

