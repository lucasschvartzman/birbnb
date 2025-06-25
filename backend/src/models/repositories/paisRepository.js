import {PaisModel} from "../schemas/paisSchema.js";

export class PaisRepository {

  constructor() {
    this.model = PaisModel;
  }

  async findAll() {
    return this.model.find();
  }

}

