export class Caracteristica {

  constructor(nombre) {
    this.nombre = nombre;
  }

  static WIFI = new Caracteristica("WIFI");
  static PISCINA = new Caracteristica("PISCINA");
  static MASCOTAS_PERMITIDAS = new Caracteristica("MASCOTAS_PERMITIDAS");
  static ESTACIONAMIENTO = new Caracteristica("ESTACIONAMIENTO");

  static #valores = new Map([
    ["WIFI", Caracteristica.WIFI],
    ["PISCINA", Caracteristica.PISCINA],
    ["MASCOTAS_PERMITIDAS", Caracteristica.MASCOTAS_PERMITIDAS],
    ["ESTACIONAMIENTO", Caracteristica.ESTACIONAMIENTO],
  ]);

  static getByNombre(nombre) {
    return this.#valores.get(nombre) || null;
  }

  static getAllAsString() {
    return Array.from(this.#valores.keys());
  }
}
