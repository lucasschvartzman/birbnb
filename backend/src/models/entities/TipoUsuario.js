export class TipoUsuario {

    constructor(nombre) {
        this.nombre = nombre;
    }

    static HUESPED = new TipoUsuario("HUESPED");
    static ANFITRION = new TipoUsuario("ANFITRION");

    static #tipos = new Map([
        ["HUESPED", TipoUsuario.HUESPED],
        ["ANFITRION", TipoUsuario.ANFITRION],
    ]);

    static getByNombre(nombre) {
        return TipoUsuario.#tipos.get(nombre) || null;
    }

    static getAllAsString() {
        return Array.from(TipoUsuario.#tipos.keys());
    }
}