export class ICountryRepository {
  async findAll() {
    throw new Error(`Method 'findAll()' must be implemented by ${this.constructor.name}`);
  }
}
