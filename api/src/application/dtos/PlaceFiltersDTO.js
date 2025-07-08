/**
 * Data Transfer Object for place filters (input)
 */
export class PlaceFiltersDTO {
  /**
   * @param {Object} params
   * @param {string} city - UUIDv4 identifier of the City.
   * @param {string} country - UUIDv4 identifier of the Country.
   * @param {number} minPrice
   * @param {number} maxPrice
   * @param {number} minCapacity
   * @param {[string]} features
   */
  constructor({city, country, minPrice, maxPrice, minCapacity, features,} = {}) {
    this.city = city;
    this.country = country;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.minCapacity = minCapacity;
    this.features = features;
  }
}