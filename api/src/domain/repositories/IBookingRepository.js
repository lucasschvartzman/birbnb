import {NotImplementedException} from "../exceptions/NotImplementedException";

/**
 * Repository interface for Booking entities.
 *
 * Defines the contract that all implementations must follow.
 *
 * @note All methods operate on domain entities and use UUIDv4 strings as identifiers.
 *
 * @abstract
 * @class
 */
export class IBookingRepository {

  /**
   * Persists a new Booking.
   *
   * @param {Booking} booking - The Booking entity to create.
   * @returns {Promise<Booking>} The created Booking with ID.
   * @throws {NotImplementedException} When called without implementation.
   */
  async create(booking) {
    throw new NotImplementedException(this.constructor.name);
  }

  /**
   * Updates an existing Booking.
   *
   * @param {Booking} booking - The Booking entity with updated data.
   * @returns {Promise<Booking>} The updated Booking.
   * @throws {NotImplementedException} When called without implementation.
   */
  async update(booking) {
    throw new NotImplementedException(this.constructor.name);
  }

  /**
   * Finds a Booking by its ID.
   *
   * @param {string} id - UUIDv4 identifier of the Booking.
   * @returns {Promise<Booking|null>} The Booking if found, or null.
   * @throws {NotImplementedException} When called without implementation.
   */
  async findById(id) {
    throw new NotImplementedException(this.constructor.name);
  }

  /**
   * Finds all Bookings for a given guest.
   *
   * @param {string} id - UUIDv4 identifier of the guest.
   * @returns {Promise<Booking[]>} An array of Bookings (empty if none found).
   * @throws {NotImplementedException} When called without implementation.
   */
  async findAllByGuest(id) {
    throw new NotImplementedException(this.constructor.name);
  }
}