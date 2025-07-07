import {NotImplementedException} from "../exceptions/NotImplementedException";

/**
 * Repository interface for Country entities.
 *
 * Defines the contract that all implementations must follow.
 * @abstract
 * @class
 */
export class ICountryRepository {

  /**
   * Retrieves all countries from the data source.
   * @returns {Promise<Country[]>} Array of countries.
   * @throws {NotImplementedException} When called without implementation.
   */
  async findAll() {
    throw new NotImplementedException(this.constructor.name);
  }
}
