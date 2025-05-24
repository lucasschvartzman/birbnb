export class EstadoReserva {
  constructor(nombre) {
    this.nombre = nombre;
  }

  static PENDIENTE = new EstadoReserva("PENDIENTE");
  static CONFIRMADA = new EstadoReserva("CONFIRMADA");
  static CANCELADA = new EstadoReserva("CANCELADA");

  static #estados = new Map([
    ["PENDIENTE", EstadoReserva.PENDIENTE],
    ["CONFIRMADA", EstadoReserva.CONFIRMADA],
    ["CANCELADA", EstadoReserva.CANCELADA],
  ]);

  static getByNombre(nombre) {
    return EstadoReserva.#estados.get(nombre) || null;
  }

  static getAllAsString() {
    return Array.from(EstadoReserva.#estados.keys());
  }
}
