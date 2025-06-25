import {CiudadModel} from "../schemas/ciudadSchema.js";

export class CiudadRepository {

  constructor() {
    this.model = CiudadModel;
  }

  async findAllByIdPais(idPais) {
    return this.model.find({pais: idPais});
  }
}