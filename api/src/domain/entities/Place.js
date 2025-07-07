import { v4 as uuidv4 } from 'uuid';
/**
 * Represents a Place.
 * @class
 */
export class Place {
  /**
   * Creates an instance of Place.
   * @constructor
   * @param {string} id - Unique identifier for the place. Generated as UUID v4 when not provided.
   * @param {string} name
   * @param {string} description
   * @param {number} price
   * @param {Date} checkInTime
   * @param {Date} checkOutTime
   * @param {Address} address
   * @param {number} capacity
   * @param {Feature[]} features
   * @param {Booking[]} bookings
   * @param {string[]} photos
   */
  constructor(id, name, description, price, checkInTime, checkOutTime, address, capacity, features, bookings, photos) {
    this.id = id || uuidv4();
    this.name = name;
    this.description = description;
    this.price = price;
    this.checkInTime = checkInTime;
    this.checkOutTime = checkOutTime;
    this.address = address;
    this.capacity = capacity;
    this.features = features;
    this.bookings = bookings;
    this.photos = photos;
  }

  /**
   * Checks if the place is available within the given date range.
   *
   * Returns true if none of the existing bookings overlap with the given range.
   *
   * @param {{ from: Date, to: Date }} dateRange - The date range to check availability for.
   * @returns {boolean} True if the place is available in the given date range, false otherwise.
   */
  isAvailableIn(dateRange) {
    return !this.bookings.some((b) => b.overlapsWith(dateRange));
  }

  /**
   * Checks if the place has the specified feature.
   *
   * @param {Feature} feature - The feature to check for.
   * @returns {boolean} True if the place includes the feature, false otherwise.
   */
  hasFeature(feature) {
    return this.features.includes(feature);
  }

  /**
   * Checks if the place has enough capacity for the given number of guests.
   *
   * @param {number} guestCount - The number of guests to check capacity for.
   * @returns {boolean} True if the place can accommodate the given number of guests.
   */
  hasCapacityFor(guestCount) {
    return this.capacity >= guestCount;
  }

  /**
   * Adds a new booking to the place.
   *
   * @param {Booking} booking - The booking to add.
   * @returns {void}
   */
  addBooking(booking) {
    this.bookings.push(booking);
  }

  // TODO: Check if needed.
  isAffordable() {}
}
