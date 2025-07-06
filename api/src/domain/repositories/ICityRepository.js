export class ICityRepository {
  async findAllByCountry(id) {
    throw new Error(`Method 'findAllByCountry()' must be implemented by ${this.constructor.name}`);
  }
}