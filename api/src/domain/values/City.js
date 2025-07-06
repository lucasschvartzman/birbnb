/**
 * Represents a city.
 * @class
 */
export class City {
  /**
   * Creates an instance of City.
   * @constructor
   * @param {string} name
   * @param {Country} country
   */
  constructor(name, country) {
    this.name = name;
    this.country = country;
  }
}
