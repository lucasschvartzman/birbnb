import {NotImplementedException} from "../exceptions/NotImplementedException";

/**
 * Repository interface for City entities.
 *
 * Defines the contract that all implementations must follow.
 * @abstract
 * @class
 */
export class ICityRepository {

  /**
   * Retrieves all cities from the data source.
   * @param {number} id Country identifier.
   * @returns {Promise<Country[]>} Array of cities from specified country.
   * @throws {NotImplementedException} When called without implementation.
   */
  async findAllByCountry(id) {
    throw new NotImplementedException(this.constructor.name);
  }
}
