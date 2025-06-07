import { beforeEach, describe, expect, test, jest } from '@jest/globals';
import { Reserva } from "../birbnb/models/entities/Reserva.js";

describe('Reserva', () => {
    let reserva;
    let mockRangoFechas;

    const datosReservaEjemplo = {
        fechaCreacion: new Date('2024-01-01'),
        email: 'usuario@ejemplo.com',
        cantidadPersonas: 2,
        idAlojamiento: 'alojamiento1',
        monto: 100
    };

    const rangosFechasEjemplo = {
        rangoSolapado: { desde: new Date('2024-02-01'), hasta: new Date('2024-02-05') },
        rangoNoSolapado: { desde: new Date('2024-03-01'), hasta: new Date('2024-03-05') },
        rangoVacio: null,
        rangoInvalido: { desde: new Date('2024-02-05'), hasta: new Date('2024-02-01') }
    };

    beforeEach(() => {
        mockRangoFechas = {
            seSuperponeCon: jest.fn()
        };

        reserva = new Reserva(
            datosReservaEjemplo.fechaCreacion,
            datosReservaEjemplo.email,
            datosReservaEjemplo.cantidadPersonas,
            datosReservaEjemplo.idAlojamiento,
            mockRangoFechas,
            datosReservaEjemplo.monto
        );
    });

    describe('estaVigenteEn', () => {
        describe('cuando existe superposición de fechas', () => {
            test('debe retornar true cuando rangoFechas.seSuperponeCon devuelve true', () => {
                mockRangoFechas.seSuperponeCon.mockReturnValue(true);

                const resultado = reserva.estaVigenteEn(rangosFechasEjemplo.rangoSolapado);

                expect(resultado).toBe(true);
                expect(mockRangoFechas.seSuperponeCon).toHaveBeenCalledWith(rangosFechasEjemplo.rangoSolapado);
                expect(mockRangoFechas.seSuperponeCon).toHaveBeenCalledTimes(1);
            });

            test('debe llamar correctamente al método seSuperponeCon con el rango proporcionado', () => {
                mockRangoFechas.seSuperponeCon.mockReturnValue(true);
                const rangoPersonalizado = { desde: new Date('2024-06-01'), hasta: new Date('2024-06-10') };

                reserva.estaVigenteEn(rangoPersonalizado);

                expect(mockRangoFechas.seSuperponeCon).toHaveBeenCalledWith(rangoPersonalizado);
            });
        });

        describe('cuando no existe superposición de fechas', () => {
            test('debe retornar false cuando rangoFechas.seSuperponeCon devuelve false', () => {
                mockRangoFechas.seSuperponeCon.mockReturnValue(false);

                const resultado = reserva.estaVigenteEn(rangosFechasEjemplo.rangoNoSolapado);

                expect(resultado).toBe(false);
                expect(mockRangoFechas.seSuperponeCon).toHaveBeenCalledWith(rangosFechasEjemplo.rangoNoSolapado);
                expect(mockRangoFechas.seSuperponeCon).toHaveBeenCalledTimes(1);
            });
        });

        describe('casos extremos', () => {
            test('debe manejar correctamente un rango de fechas nulo', () => {
                mockRangoFechas.seSuperponeCon.mockReturnValue(false);

                const resultado = reserva.estaVigenteEn(rangosFechasEjemplo.rangoVacio);

                expect(resultado).toBe(false);
                expect(mockRangoFechas.seSuperponeCon).toHaveBeenCalledWith(rangosFechasEjemplo.rangoVacio);
            });

            test('debe delegar correctamente la validación de rangos inválidos al método seSuperponeCon', () => {
                mockRangoFechas.seSuperponeCon.mockReturnValue(false);

                const resultado = reserva.estaVigenteEn(rangosFechasEjemplo.rangoInvalido);

                expect(resultado).toBe(false);
                expect(mockRangoFechas.seSuperponeCon).toHaveBeenCalledWith(rangosFechasEjemplo.rangoInvalido);
            });
        });

        describe('verificación de estado del mock', () => {
            test('debe mantener el estado del mock independiente entre tests', () => {
                // Primer llamado
                mockRangoFechas.seSuperponeCon.mockReturnValue(true);
                const resultado1 = reserva.estaVigenteEn(rangosFechasEjemplo.rangoSolapado);

                // Segundo llamado con diferente valor de retorno
                mockRangoFechas.seSuperponeCon.mockReturnValue(false);
                const resultado2 = reserva.estaVigenteEn(rangosFechasEjemplo.rangoNoSolapado);

                expect(resultado1).toBe(true);
                expect(resultado2).toBe(false);
                expect(mockRangoFechas.seSuperponeCon).toHaveBeenCalledTimes(2);
            });
        });
    });
});