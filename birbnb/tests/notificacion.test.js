import { jest } from '@jest/globals';
import { NotificacionService } from '../services/notificacionService';

describe('NotificacionService - con array de notificaciones', () => {
  let service;
  let mockRepository;

  // Array base de notificaciones
  const todasLasNotificaciones = [
    { id: '1', mensaje: 'Mensaje 1', leida: false },
    { id: '2', mensaje: 'Mensaje 2', leida: true },
    { id: '3', mensaje: 'Mensaje 3', leida: false },
    { id: '4', mensaje: 'Mensaje 4', leida: true }
  ];

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      save: jest.fn()
    };
    service = new NotificacionService(mockRepository);
  });

  test('debe devolver solo las leídas desde array base', async () => {
    // Simula el comportamiento del repo: filtra el array
    mockRepository.findAll.mockImplementation((filtros) => {
      return Promise.resolve(
        todasLasNotificaciones.filter(n => {
          for (let key in filtros) {
            if (n[key] !== filtros[key]) return false;
          }
          return true;
        })
      );
    });

    const result = await service.findAll({ leida: true });

    expect(result).toEqual([
      { id: '2', mensaje: 'Mensaje 2', leida: true },
      { id: '4', mensaje: 'Mensaje 4', leida: true }
    ]);
  });

  
  test('debe devolver solo las no leídas desde array base', async () => {
    // Simula el comportamiento del repo: filtra el array
    mockRepository.findAll.mockImplementation((filtros) => {
      return Promise.resolve(
        todasLasNotificaciones.filter(n => {
          for (let key in filtros) {
            if (n[key] !== filtros[key]) return false;
          }
          return true;
        })
      );
    });

    const result = await service.findAll({ leida: false });

    expect(result).toEqual([
      { id: '1', mensaje: 'Mensaje 1', leida: false },
      { id: '3', mensaje: 'Mensaje 3', leida: false }
    ]);
  });

  test('debe devolver todas si no hay filtro', async () => {
    mockRepository.findAll.mockResolvedValue(todasLasNotificaciones);

    const result = await service.findAll({});

    expect(result).toEqual(todasLasNotificaciones);
  });




    test('debe marcar como leída una notificación no leída', async () => {
    const notificacionId = '1';
    const notificacionOriginal = {
      id: notificacionId,
      mensaje: 'Mensaje 1',
      leida: false
    };

    const notificacionActualizada = {
      ...notificacionOriginal,
      leida: true,
      fechaLeida: expect.any(Date)
    };

    mockRepository.save.mockResolvedValue(notificacionActualizada);

    const result = await service.marcarComoLeida(notificacionId);

    expect(mockRepository.save).toHaveBeenCalledWith({
      id: notificacionId,
      leida: true,
      fechaLeida: expect.any(Date)
    });
    expect(result).toEqual(notificacionActualizada);
  });

  test('debe lanzar un error si la notificación no se encuentra', async () => {
  const idInexistente = '999';

  // Simulamos que save no encuentra la notificación
  mockRepository.save.mockResolvedValue(null);

  await expect(service.marcarComoLeida(idInexistente))
    .rejects
    .toThrow(`Notificación con id ${idInexistente} no encontrada`);

  expect(mockRepository.save).toHaveBeenCalledWith({
    id: idInexistente,
    leida: true,
    fechaLeida: expect.any(Date)
  });
});


});
