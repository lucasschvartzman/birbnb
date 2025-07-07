import { ICityRepository } from "../../../../domain/repositories/ICityRepository";
import { CityModel } from "../schemas/CitySchema";

export class CityMongoRepository extends ICityRepository {
  constructor() {
    super();
    this.model = CityModel;
  }

  async findAllByCountry(id) {
    return this.model.find({ country: id });
  }
}
