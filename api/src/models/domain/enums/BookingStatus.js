/**
 * Represents the booking statuses as an enum.
 *
 * Stores both the raw value (used for persistence) and a human-friendly label (used for UI).
 *
 * @readonly
 * @enum {{value: string, label: string}}
 */
export const BookingStatus = Object.freeze({
  PENDING: { value: "PENDING", label: "Pending" },
  CONFIRMED: { value: "CONFIRMED", label: "Confirmed" },
  CANCELED: { value: "CANCELED", label: "Canceled" },

  /**
   * Returns all possible booking statuses as strings.
   *
   * @returns {string[]} An array of all `value` strings (e.g., ["PENDING", "CONFIRMED", "CANCELLED"])
   */
  getAllAsString() {
    return Object.values(this)
      .filter((e) => typeof e === "object")
      .map((e) => e.value);
  },

  /**
   * Finds a booking status entry by its string value.
   *
   * @param {string} str - The raw value to search for (e.g., "PENDING").
   * @returns {{value: string, label: string} | null} The matching status object, or null if not found.
   */
  getByString(str) {
    return Object.values(this).find((e) => e?.value === str) || null;
  },
});
