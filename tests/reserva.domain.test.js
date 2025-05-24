import { jest } from '@jest/globals';
import { Reserva } from "../birbnb/models/entities/Reserva.js";

describe('Reserva.estaVigenteEn', () => {
    it('debe retornar true cuando rangoFechas.seSuperponeCon devuelve true', () => {
        // 1. Preparamos un mock de rangoFechas con seSuperponeCon
        const mockRangoOriginal = {
            seSuperponeCon: jest.fn().mockReturnValue(true),
        };
        const reserva = new Reserva(
            new Date(),
            'usuario@ejemplo.com',
            2,
            'alojamiento1',
            mockRangoOriginal,
            100
        );

        // 2. Definimos un rangoDeFechas de prueba
        const nuevoRango = { desde: new Date(), hasta: new Date() };

        // 3. Invocamos el método
        const resultado = reserva.estaVigenteEn(nuevoRango);

        // 4. Verificaciones
        expect(mockRangoOriginal.seSuperponeCon).toHaveBeenCalledWith(nuevoRango);
        expect(resultado).toBe(true);
    });

    it('debe retornar false cuando rangoFechas.seSuperponeCon devuelve false', () => {
        const mockRangoOriginal = {
            seSuperponeCon: jest.fn().mockReturnValue(false),
        };
        const reserva = new Reserva(
            new Date(),
            'usuario@ejemplo.com',
            2,
            'alojamiento1',
            mockRangoOriginal,
            100
        );

        const nuevoRango = { desde: new Date(), hasta: new Date() };
        const resultado = reserva.estaVigenteEn(nuevoRango);

        expect(mockRangoOriginal.seSuperponeCon).toHaveBeenCalledWith(nuevoRango);
        expect(resultado).toBe(false);
    });
});