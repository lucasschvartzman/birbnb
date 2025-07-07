/**
 * Base class for all domain exceptions.
 * Provides HTTP status code for middlewares.
 * @class
 */
export class DomainException extends Error {
  /**
   * Creates a domain exception.
   * @constructor
   * @param {string} message - Error message
   * @param {HttpStatus} httpStatus - HTTP status code for API responses
   */
  constructor(message, httpStatus) {
    super(message);
    this.httpStatus = httpStatus;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}