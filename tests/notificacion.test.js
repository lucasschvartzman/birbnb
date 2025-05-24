import { jest } from '@jest/globals';
import { NotificacionService } from '../birbnb/services/notificacionService.js';

describe('NotificacionService - con array de notificaciones', () => {
  let service;
  let mockRepository;

  const todasLasNotificaciones = [
    { id: '1', mensaje: 'Mensaje 1', leida: false },
    { id: '2', mensaje: 'Mensaje 2', leida: true },
    { id: '3', mensaje: 'Mensaje 3', leida: false },
    { id: '4', mensaje: 'Mensaje 4', leida: true }
  ];

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn()
    };
    service = new NotificacionService(mockRepository);
  });

  test('debe devolver solo las leídas', async () => {
    mockRepository.findAll.mockResolvedValue(
        todasLasNotificaciones.filter(n => n.leida)
    );

    const result = await service.findAll({ leida: true });

    expect(result).toEqual([
      { id: '2', mensaje: 'Mensaje 2', leida: true },
      { id: '4', mensaje: 'Mensaje 4', leida: true }
    ]);
    expect(mockRepository.findAll).toHaveBeenCalledWith({ leida: true });
  });

  test('debe devolver solo las no leídas', async () => {
    mockRepository.findAll.mockResolvedValue(
        todasLasNotificaciones.filter(n => !n.leida)
    );

    const result = await service.findAll({ leida: false });

    expect(result).toEqual([
      { id: '1', mensaje: 'Mensaje 1', leida: false },
      { id: '3', mensaje: 'Mensaje 3', leida: false }
    ]);
    expect(mockRepository.findAll).toHaveBeenCalledWith({ leida: false });
  });

  test('debe devolver todas si no hay filtro', async () => {
    mockRepository.findAll.mockResolvedValue(todasLasNotificaciones);

    const result = await service.findAll({});

    expect(result).toEqual(todasLasNotificaciones);
    expect(mockRepository.findAll).toHaveBeenCalledWith({});
  });

  test('debe marcar como leída una notificación no leída', async () => {
    const notificacionId = '1';
    const notificacionOriginal = {
      id: notificacionId,
      mensaje: 'Mensaje 1',
      leida: false,
      marcarComoLeida: jest.fn(function () {
        this.leida = true;
        this.fechaLeida = new Date();
      })
    };

    const notificacionGuardada = {
      ...notificacionOriginal,
      leida: true,
      fechaLeida: expect.any(Date)
    };

    mockRepository.findById.mockResolvedValue(notificacionOriginal);
    mockRepository.save.mockResolvedValue(notificacionGuardada);

    const result = await service.marcarComoLeida(notificacionId);

    expect(notificacionOriginal.marcarComoLeida).toHaveBeenCalled();
    expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      id: notificacionId,
      leida: true,
      fechaLeida: expect.any(Date)
    }));
    expect(result).toEqual(notificacionGuardada);
  });

  test('no hace nada si ya está leída', async () => {
    const notificacionLeida = {
      id: '2',
      mensaje: 'Mensaje 2',
      leida: true,
      marcarComoLeida: jest.fn() // no debería llamarse
    };

    mockRepository.findById.mockResolvedValue(notificacionLeida);

    const result = await service.marcarComoLeida('2');

    expect(notificacionLeida.marcarComoLeida).not.toHaveBeenCalled();
    expect(result).toEqual(notificacionLeida);
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  test('lanza error si la notificación no se encuentra al guardar', async () => {
    const notificacionId = '999';
    const notificacionMock = {
      id: notificacionId,
      leida: false,
      marcarComoLeida: jest.fn(function () {
        this.leida = true;
        this.fechaLeida = new Date();
      })
    };

    mockRepository.findById.mockResolvedValue(notificacionMock);
    mockRepository.save.mockResolvedValue(null); // Simula que no se guardó

    await expect(service.marcarComoLeida(notificacionId))
        .rejects
        .toThrow(`Notificación con id ${notificacionId} no encontrada`);

    expect(mockRepository.save).toHaveBeenCalled();
  });
});
