import {NotImplementedException} from "../exceptions/NotImplementedException";

/**
 * Repository interface for Guest entities.
 *
 * Defines the contract that all implementations must follow.
 * @abstract
 * @class
 */
export class IGuestRepository {

  /**
   * Finds a guest by their unique identifier.
   *
   * @param {string} id - The ID of the guest.
   * @returns {Promise<Guest>} The guest entity.
   * @throws {NotImplementedException} When called without implementation.
   */
  async findById(id) {
    throw new NotImplementedException(this.constructor.name);
  }

  /**
   * Finds a guest by their email and password.
   *
   * @param {string} email - The guest's email.
   * @param {string} password - The guest's password.
   * @returns {Promise<Guest>} The guest entity.
   * @throws {NotImplementedException} When called without implementation.
   */
  async findByEmailAndPassword(email, password) {
    throw new NotImplementedException(this.constructor.name);
  }
}
