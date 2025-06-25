import mongoose from "mongoose";
import { Usuario } from "../entities/Usuario.js";
import { TipoUsuario } from "../entities/TipoUsuario.js";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    tipo: {
      type: String,
      enum: TipoUsuario.getAllAsString(),
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "usuarios",
  }
);

usuarioSchema.loadClass(Usuario);

export const UsuarioModel = mongoose.model("Usuario", usuarioSchema);
