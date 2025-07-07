import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a Guest.
 * @class
 */
export class Guest {
  /**
   * Creates an instance of Guest.
   * @constructor
   * @param {string} id - Unique identifier for the guest. Generated as UUID v4 when not provided.
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} password
   */
  constructor(id,firstName, lastName, email, password) {
    this.id = id || uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
