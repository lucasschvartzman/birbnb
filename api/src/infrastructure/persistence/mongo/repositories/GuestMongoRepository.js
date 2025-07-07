import { IGuestRepository } from "../../../../domain/repositories/IGuestRepository";
import { GuestModel } from "../schemas/GuestSchema";

export class GuestMongoRepository extends IGuestRepository {
  constructor() {
    super();
    this.model = GuestModel;
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findByEmailAndPassword(email, password) {
    return this.model.findOne({email: email, password: password});
  }
}
