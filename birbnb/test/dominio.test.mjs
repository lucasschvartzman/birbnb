// test/dominio.test.js
const Reserva = require('../models/entities/Reserva');

describe('Reserva (Dominio)', () => {
  test('inicializa correctamente una reserva', () => {
    const reserva = new Reserva(
      new Date('2025-05-23'),
      'usuario@ejemplo.com',
      2,
      'alojamiento1',
      { /* rangoFechas mock */ },
      150
    );
    expect(reserva).toBeDefined();
    expect(reserva.usuario).toBe('usuario@ejemplo.com');
    expect(reserva.precioTotal).toBe(150);
  });

  test('permite actualizar el estado', () => {
    const reserva = new Reserva(
      new Date(),
      'usuario',
      2,
      'alojamiento2',
      { /* rangoFechas mock */ },
      200
    );
    reserva.actualizarEstado('confirmada');
    expect(reserva.estado).toBe('confirmada');
  });

  test('verifica si la reserva se superpone con otra', () => {
    const mockFechas = {
      seSuperponeCon: jest.fn().mockReturnValue(true)
    };
    const reserva = new Reserva(new Date(), 'user', 1, 'alojamiento', mockFechas, 100);
    const resultado = reserva.estaVigenteEn({});
    expect(mockFechas.seSuperponeCon).toHaveBeenCalled();
    expect(resultado).toBe(true);
  });
});

