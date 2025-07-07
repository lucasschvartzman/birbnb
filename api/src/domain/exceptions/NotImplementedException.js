export class NotImplementedException extends Error {
  constructor(className) {
    super(`Method must be implemented by ${className}`);
  }
}