class Moneda {
    nombre;
    constructor(nombre) {
        this.nombre = nombre;
    }
}

Moneda.DOLAR_USA = new Moneda("DOLAR_USA");
Moneda.PESO_ARG = new Moneda("PESO_ARG");
Moneda.REALES = new Moneda("REALES");