import {NotImplementedException} from "../exceptions/NotImplementedException";

/**
 * Repository interface for Notification entities.
 *
 * Defines the contract that all implementations must follow.
 *
 * @note All methods operate on domain entities and use UUIDv4 strings as identifiers.
 *
 * @abstract
 * @class
 */
export class INotificationRepository {

  /**
   * Persists a new Notification.
   *
   * @param {Notification} notification - The Notification entity to create.
   * @returns {Promise<Notification>} The created Notification with ID.
   * @throws {NotImplementedException} When called without implementation.
   */
  async create(notification) {
    throw new NotImplementedException(this.constructor.name);
  }

  /**
   * Updates an existing Notification.
   *
   * @param {Notification} notification - The Notification entity with updated data.
   * @returns {Promise<Notification>} The updated Notification.
   * @throws {NotImplementedException} When called without implementation.
   */
  async update(notification) {
    throw new NotImplementedException(this.constructor.name);
  }

  /**
   * Finds a Notification by its ID.
   *
   * @param {string} id - UUIDv4 identifier of the Notification.
   * @returns {Promise<Notification|null>} The Notification if found, or null.
   * @throws {NotImplementedException} When called without implementation.
   */
  async findById(id) {
    throw new NotImplementedException(this.constructor.name);
  }

  /**
   * Finds all Notifications for a given guest.
   *
   * @param {string} id - UUIDv4 identifier of the guest.
   * @returns {Promise<Notification[]>} An array of Notifications (empty if none found).
   * @throws {NotImplementedException} When called without implementation.
   */
  async findAllByGuest(id) {
    throw new NotImplementedException(this.constructor.name);
  }
}