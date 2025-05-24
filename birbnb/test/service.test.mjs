// test/service.test.js
const ReservaService = require('../services/reservaService');

describe('ReservaService (mockeado)', () => {
  let service;
  let mockRepo;
  let mockAlojRepo;

  beforeEach(() => {
    mockRepo = {
      guardar: jest.fn(),
      cancelar: jest.fn(),
      modificar: jest.fn(),
      obtenerHistorialPorUsuario: jest.fn()
    };
    mockAlojRepo = {
      estaDisponible: jest.fn()
    };
    service = new ReservaService(mockRepo, mockAlojRepo);
  });

  test('crearReserva lanza error si el alojamiento no está disponible', async () => {
    mockAlojRepo.estaDisponible.mockReturnValue(false);
    await expect(service.crearReserva({ alojamientoId: '1' })).rejects.toThrow('Alojamiento no disponible');
  });

  test('crearReserva crea reserva si hay disponibilidad', async () => {
    mockAlojRepo.estaDisponible.mockReturnValue(true);
    mockRepo.guardar.mockResolvedValue(true);
    const resultado = await service.crearReserva({ alojamientoId: '1' });
    expect(mockRepo.guardar).toHaveBeenCalled();
    expect(resultado).toBeTruthy();
  });

  test('cancelarReserva lanza error si la fecha ya pasó', async () => {
    // Simular que la reserva tiene fecha pasada
    const reservaMock = { fecha: new Date(Date.now() - 86400000) }; // ayer
    await expect(service.cancelarReserva(reservaMock)).rejects.toThrow('No se puede cancelar reservas pasadas');
  });

  test('cancelarReserva llama correctamente al repo', async () => {
    const reservaMock = { fecha: new Date(Date.now() + 86400000) }; // mañana
    mockRepo.cancelar.mockResolvedValue(true);
    const resultado = await service.cancelarReserva(reservaMock);
    expect(mockRepo.cancelar).toHaveBeenCalledWith(reservaMock);
    expect(resultado).toBeTruthy();
  });

  // Otros tests similares para modificarReserva y obtenerHistorialPorUsuario
});
