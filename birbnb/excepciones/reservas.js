export class ReservaInvalida extends Error {
    constructor(mensaje) {
      super(mensaje);
      this.name = "ReservaInvalida";
    }
  }
  
  export class ReservaNoExiste extends Error {
    constructor(id) {
      super(`Reserva con id ${id} no existe`);
      this.name = "ReservaNoExiste";
    }
  }
  