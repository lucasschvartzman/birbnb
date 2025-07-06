/**
 * Represents a place address.
 * @class
 */
export class Address {
  /**
   * Creates an instance of Address.
   * @constructor
   * @param {string} street
   * @param {number} number
   * @param {City} city
   * @param {float} latitude
   * @param {float} longitude
   */
  constructor(street, number, city, latitude, longitude) {
    this.street = street;
    this.number = number;
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
