import { Alojamiento } from "../birbnb/models/entities/Alojamiento";
import { Caracteristica } from "../birbnb/models/entities/Caracteristica";
import { RangoFechas } from "../birbnb/models/entities/RangoFechas";
import { Reserva } from "../birbnb/models/entities/Reserva";

const mockReserva = new Reserva(null, null, 3, null, new RangoFechas('2025-01-01', '2025-01-10'), 30);
const mockAlojamiento = new Alojamiento(null, null, null, 30, null, null, null, null, 4)
mockAlojamiento.caracteristicas = [Caracteristica.WIFI, Caracteristica.ESTACIONAMIENTO]

describe('estaDisponibleEn', () => {
    test('cuando no hay reservas, esta disponible', () => {
        const alojamiento = new Alojamiento()
        const rangoDeFechas = new RangoFechas('2025-01-15','2025-01-30')
        const disponible = alojamiento.estaDisponibleEn(rangoDeFechas);
        expect(disponible).toBe(true);
    });

    test('si no hay reservas que coincidan en el rango, esta disponible', () => {
        const alojamiento = new Alojamiento()
        alojamiento.agregarReserva(mockReserva);
        const rangoDeFechas = new RangoFechas('2025-01-15','2025-01-30')
        const disponible = alojamiento.estaDisponibleEn(rangoDeFechas);
        expect(disponible).toBe(true);
    });

    test('si hay reservas que coincidan en el rango, NO esta disponible', () => {
        const alojamiento = new Alojamiento()
        alojamiento.agregarReserva(mockReserva);
        const rangoDeFechas = new RangoFechas('2025-01-05','2025-01-15')
        const disponible = alojamiento.estaDisponibleEn(rangoDeFechas);
        expect(disponible).toBe(false);
    });

    test('si coincide solo 1 dia, que es el checkin o out, esta disponible', () => {
        const alojamiento = new Alojamiento()
        alojamiento.agregarReserva(mockReserva);
        const rangoDeFechas = new RangoFechas('2025-01-10','2025-01-20')

        const disponible = alojamiento.estaDisponibleEn(rangoDeFechas);
        expect(disponible).toBe(true);
    });
});

describe('suPrecioEstaDentroDe', () => {
    test('si el precio está dentro del rango', () => {
        const dentroDelRango = mockAlojamiento.suPrecioEstaDentroDe(10, 40);
        expect(dentroDelRango).toBe(true);
    });

    test('si el precio es igual al valor mínimo', () => {
        const enElMinimo = mockAlojamiento.suPrecioEstaDentroDe(30, 60);
        expect(enElMinimo).toBe(true);
    });

    test('si el precio es igual al valor máximo', () => {
        const enElMaximo = mockAlojamiento.suPrecioEstaDentroDe(10, 30);
        expect(enElMaximo).toBe(true);
    });
    
    test('si máximo y mínimo son iguales al precio', () => {
        const porEncima = mockAlojamiento.suPrecioEstaDentroDe(30, 30);
        expect(porEncima).toBe(true);
    });

});

describe('tieneCaracteristica', () => {

    test('si la característica existe en el array del alojamiento, la tiene', () => {
        expect(mockAlojamiento.tieneCaracteristica(Caracteristica.WIFI)).toBe(true);
    });

    test('si la característica no existe en el array del alojamiento, no la tiene', () => {
        expect(mockAlojamiento.tieneCaracteristica(Caracteristica.MASCOTAS_PERMITIDAS)).toBe(false);
    });

});

describe('tieneCapacidadPara', () => {
    test('si la cantidad de huéspedes es menor al máximo, tiene capacidad para ellos', () => {
        expect(mockAlojamiento.tieneCapacidadPara(2)).toBe(true);
    });

    test('si la cantidad de huéspedes es igual al máximo, tiene capacidad para ellos', () => {
        expect(mockAlojamiento.tieneCapacidadPara(4)).toBe(true);
    });

    test('si cantidad de huéspedes excede el máximo, no tiene capacidad para ellos', () => {
        expect(mockAlojamiento.tieneCapacidadPara(5)).toBe(false);
    });
});

describe('agregarReserva', () => {
    test('debe poder agregar múltiples reservas al array de reservas', () => {
        const reserva1 = new Reserva();
        const reserva2 = new Reserva();
        const alojamiento = new Alojamiento()
        alojamiento.agregarReserva(reserva1);
        alojamiento.agregarReserva(reserva2);

        expect(alojamiento.reservas).toHaveLength(2);
        expect(alojamiento.reservas[0]).toBe(reserva1);
        expect(alojamiento.reservas[1]).toBe(reserva2);
    });

});
