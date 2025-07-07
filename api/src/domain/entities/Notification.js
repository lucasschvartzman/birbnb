import { v4 as uuidv4 } from 'uuid';
/**
 * Represents a Notification.
 * @class
 */
export class Notification {
  /**
   * Creates an instance of Notification.
   * @constructor
   * @param {string} id - Unique identifier for the notification. Generated as UUID v4 when not provided.
   * @param {Guest} guest
   * @param {string} message
   * @param {Date} createdAt
   * @param {boolean} read
   * @param {Date} readAt
   */
  constructor(id, guest, message, createdAt, read, readAt) {
    this.id = id || uuidv4();
    this.guest = guest;
    this.message = message;
    this.createdAt = createdAt;
    this.read = read;
    this.readAt = readAt;
  }

  /**
   * Marks the notification as read and sets the read timestamp to the current date and time.
   * @returns {void}
   */
  setAsRead() {
    this.read = true;
    this.readAt = new Date();
  }

  /**
   * Returns whether the notification has been read.
   * @returns {boolean} True if the notification is read; otherwise false.
   */
  isRead() {
    return this.read;
  }
}
