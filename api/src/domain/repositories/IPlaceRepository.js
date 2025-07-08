import {NotImplementedException} from "../exceptions/NotImplementedException";

/**
 * Repository interface for Place entities.
 *
 * Defines the contract that all implementations must follow.
 *
 * @note All methods operate on domain entities and use UUIDv4 strings as identifiers.
 *
 * @abstract
 * @class
 */
export class IPlaceRepository {

  /**
   * Persists a new Place.
   *
   * @param {Place} place - The Place entity to create.
   * @returns {Promise<Place>} The created Place with ID.
   * @throws {NotImplementedException} When called without implementation.
   */
  async create(place) {
    throw new NotImplementedException(this.constructor.name);
  }

  /**
   * Finds a Place by its ID.
   *
   * @param {string} id - UUIDv4 identifier of the Booking.
   * @returns {Promise<Place|null>} The Place if found, or null.
   * @throws {NotImplementedException} When called without implementation.
   */
  async findById(id) {
    throw new NotImplementedException(this.constructor.name);
  }

  /**
   * @typedef {Object} FindAllResult
   * @property {Place[]} places
   * @property {PaginationResultDTO} pagination
   */

  /**
   * Finds all Places with optional filters and pagination options.
   *
   * @param {PlaceFiltersDTO} [filters] - Optional place filters (defaults to empty object)
   * @param {PaginationOptionsDTO} [paginationOptions] - Optional pagination options (see note).
   * @returns {Promise<FindAllResult>} An array of FindAllResult (with empty array of places if none found).
   * @throws {NotImplementedException} When called without implementation.
   *
   * @note See application/constants/pagination.js for default pagination option values
   */
  async findAll(filters, paginationOptions) {
    throw new NotImplementedException(this.constructor.name);
  }
}