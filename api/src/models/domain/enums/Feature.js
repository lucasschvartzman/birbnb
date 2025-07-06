/**
 * Represents the place features as an enum.
 *
 * Stores both the raw value (used for persistence) and a human-friendly label (used for UI).
 *
 * @readonly
 * @enum {{value: string, label: string}}
 */
export const Feature = Object.freeze({
  POOL: { value: "POOL", label: "Pool" },
  PETS: { value: "PETS", label: "Pets" },
  WIFI: { value: "WIFI", label: "Wi-Fi" },
  PARKING: { value: "PARKING", label: "Parking" },

  /**
   * Returns all possible features as strings.
   *
   * @returns {string[]} An array of all `value` strings (e.g., ["POOL", "PARKING"])
   */
  getAllAsString() {
    return Object.values(this)
      .filter((e) => typeof e === "object")
      .map((e) => e.value);
  },

  /**
   * Finds a feature entry by its string value.
   *
   * @param {string} str - The raw value to search for (e.g., "POOL").
   * @returns {{value: string, label: string} | null} The matching status object, or null if not found.
   */
  getByString(str) {
    return Object.values(this).find((e) => e?.value === str) || null;
  },
});
