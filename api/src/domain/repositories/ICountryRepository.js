import {NotImplementedException} from "../exceptions/NotImplementedException";

/**
 * Repository interface for Country entities.
 *
 * Defines the contract that all implementations must follow.
 *
 * @note All methods operate on domain entities and use UUIDv4 strings as identifiers.
 *
 * @abstract
 * @class
 */
export class ICountryRepository {

  /**
   * Finds all Countries
   *
   * @returns {Promise<Country[]>} An array of Countries (empty if none found).
   * @throws {NotImplementedException} When called without implementation.
   */
  async findAll() {
    throw new NotImplementedException(this.constructor.name);
  }
}