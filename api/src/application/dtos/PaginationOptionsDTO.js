import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants/pagination";

/**
 * Data Transfer Object for pagination options (input)
 */
export class PaginationOptionsDTO {
  /**
   * @param {Object} params
   * @param {number} pageNumber
   * @param {number} pageSize
   *
   * @note See application/constants/pagination.js for default values
   */
  constructor({ pageNumber = DEFAULT_PAGE_NUMBER, pageSize = DEFAULT_PAGE_SIZE } = {}) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
