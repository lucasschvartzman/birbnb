import { ICountryRepository } from "../../../../domain/repositories/ICountryRepository";
import { CountryModel } from "../schemas/CountrySchema";

export class CountryMongoRepository extends ICountryRepository {
  constructor() {
    super();
    this.model = CountryModel;
  }

  async findAll() {
    return this.model.find();
  }
}
