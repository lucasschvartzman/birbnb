/**
 * Represents a Booking.
 * @class
 */
export class Booking {
  /**
   * Creates an instance of Booking.
   * @constructor
   * @param {Place} place
   * @param {Guest} guest
   * @param {number} totalGuests
   * @param {number} price
   * @param {Date} createdAt
   * @param {DateRange} dateRange
   * @param {BookingStatus} status
   */
  constructor(place, guest, totalGuests, price, createdAt, dateRange, status) {
    this.place = place;
    this.guest = guest;
    this.totalGuests = totalGuests;
    this.price = price;
    this.createdAt = createdAt;
    this.dateRange = dateRange;
    this.status = status;
  }

  /**
   * Updates the booking status.
   * @param {BookingStatus} status - The new status to set.
   * @returns {void}
   */
  setStatus(status) {
    this.status = status;
  }

  /**
   * Checks if this booking overlaps with a given date range.
   * @param {DateRange} dateRange - The date range to check overlap against.
   * @returns {boolean} True if the booking's date range overlaps with the given date range, false otherwise.
   */
  overlapsWith(dateRange) {
    return this.dateRange.overlapsWith(dateRange);
  }

  // TODO: Check if needed.
  isActive(date) {}

  // TODO: Check if needed.
  isCancelled() {}
}
