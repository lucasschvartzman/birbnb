/**
 * Data Transfer Object for pagination results (output)
 */
export class PaginationResultDTO {
  /**
   * @param {Object} params
   * @param {number} pageNumber
   * @param {number} pageSize
   * @param {number} totalPages
   * @param {boolean} hasNextPage
   * @param {boolean} hasPreviousPage
   */
  constructor({ pageNumber, pageSize, totalPages, hasNextPage, hasPreviousPage }) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalPages = totalPages;
    this.hasNextPage = hasNextPage;
    this.hasPreviousPage = hasPreviousPage;
  }
}
