export class Moneda {
  constructor(nombre) {
    this.nombre = nombre;
  }

  static DOLAR_USA = new Moneda("DOLAR_USA");
  static PESO_ARG = new Moneda("PESO_ARG");
  static REALES = new Moneda("REALES");

  static #valores = new Map([
    ["DOLAR_USA", Moneda.DOLAR_USA],
    ["PESO_ARG", Moneda.PESO_ARG],
    ["REALES", Moneda.REALES],
  ]);

  static getByNombre(nombre) {
    return this.#valores.get(nombre) || null;
  }

  static getAllAsString() {
    return Array.from(this.#valores.keys());
  }
}
