/**
 * Represents a Guest.
 * @class
 */
export class Guest {
  /**
   * Creates an instance of Guest.
   * @constructor
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} password
   */
  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
