import {NotImplementedException} from "../exceptions/NotImplementedException";

/**
 * Repository interface for City entities.
 *
 * Defines the contract that all implementations must follow.
 *
 * @note All methods operate on domain entities and use UUIDv4 strings as identifiers.
 *
 * @abstract
 * @class
 */
export class ICityRepository {

  /**
   * Finds all Cities for a given country.
   *
   * @param {string} id - UUIDv4 identifier of the country.
   * @returns {Promise<City[]>} An array of Cities (empty if none found).
   * @throws {NotImplementedException} When called without implementation.
   */
  async findAllByCountry(id) {
    throw new NotImplementedException(this.constructor.name);
  }
}