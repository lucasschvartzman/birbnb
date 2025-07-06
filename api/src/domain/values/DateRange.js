/**
 * Represents a range of dates between a start and end date.
 * @class
 */
export class DateRange {
  /**
   * Creates an instance of DateRange.
   * @constructor
   * @param {Date|string|number} startDate
   * @param {Date|string|number} endDate
   */
  constructor(startDate, endDate) {
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
  }

  /**
   * Determines if this date range overlaps with another date range.
   *
   * Two date ranges overlap if they share at least one point in time.
   *
   * @param {DateRange} dateRange - Another DateRange instance to check overlap against.
   * @returns {boolean} True if the date ranges overlap; otherwise, false.
   */
  overlapsWith(dateRange) {
    return this.startDate <= dateRange.endDate && this.endDate >= dateRange.startDate;
  }

  /**
   * Determines if a given date is included within this date range (inclusive).
   *
   * @param {Date|string|number} date - The date to check. Can be a Date object, a date string, or a timestamp.
   * @returns {boolean} True if the date falls within the range; otherwise, false.
   */
  includes(date) {
    const d = date instanceof Date ? date : new Date(date);
    return this.startDate <= d && this.endDate >= d;
  }
}
