import { beforeEach, describe, expect, test, jest } from '@jest/globals';
import { NotificacionService } from '../src/services/notificacionService.js';
import { NotificacionNoExisteException } from '../src/exceptions/notificacionExceptions.js';
import { UsuarioNoExisteException } from "../src/exceptions/usuarioExceptions.js";

describe('NotificacionService', () => {
  let servicio;
  let repositorioMock;
  let usuarioServiceMock;
  let alojamientoRepositoryMock;

  const notificacionesEjemplo = [
    { id: '1', mensaje: 'Nueva reserva recibida', leida: false, fechaCreacion: new Date('2024-01-01') },
    { id: '2', mensaje: 'Reserva confirmada', leida: true, fechaCreacion: new Date('2024-01-02'), fechaLeida: new Date('2024-01-03') },
    { id: '3', mensaje: 'Pago procesado exitosamente', leida: false, fechaCreacion: new Date('2024-01-04') },
    { id: '4', mensaje: 'Calificación recibida', leida: true, fechaCreacion: new Date('2024-01-05'), fechaLeida: new Date('2024-01-06') },
    { id: '5', mensaje: 'Recordatorio de check-in', leida: false, fechaCreacion: new Date('2024-01-07') }
  ];

  beforeEach(() => {
    repositorioMock = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn()
    };
    usuarioServiceMock = {
      validarExistenciaUsuario: jest.fn(),
      obtenerUsuarioPorId: jest.fn()
    };
    alojamientoRepositoryMock = {
      findById: jest.fn()
    };
    servicio = new NotificacionService(repositorioMock, alojamientoRepositoryMock, usuarioServiceMock);
  });

  describe('obtenerNotificacionesUsuario', () => {
    describe('cuando se filtra por estado de lectura', () => {
      test('debe retornar solo notificaciones leídas cuando el filtro leida es true', async () => {
        const idUsuario = 'usuario123';
        const notificacionesLeidasEsperadas = notificacionesEjemplo.filter(n => n.leida);
        usuarioServiceMock.validarExistenciaUsuario.mockResolvedValue(true);
        repositorioMock.findAll.mockResolvedValue(notificacionesLeidasEsperadas);

        const resultado = await servicio.obtenerNotificacionesUsuario(idUsuario, { leida: true });

        expect(usuarioServiceMock.validarExistenciaUsuario).toHaveBeenCalledWith(idUsuario);
        expect(resultado).toEqual(notificacionesLeidasEsperadas);
        expect(resultado).toHaveLength(2);
        expect(repositorioMock.findAll).toHaveBeenCalledWith({ leida: true });
        expect(repositorioMock.findAll).toHaveBeenCalledTimes(1);
      });

      test('debe retornar solo notificaciones no leídas cuando el filtro leida es false', async () => {
        const idUsuario = 'usuario123';
        const notificacionesNoLeidasEsperadas = notificacionesEjemplo.filter(n => !n.leida);
        usuarioServiceMock.validarExistenciaUsuario.mockResolvedValue(true);
        repositorioMock.findAll.mockResolvedValue(notificacionesNoLeidasEsperadas);

        const resultado = await servicio.obtenerNotificacionesUsuario(idUsuario, { leida: false });

        expect(usuarioServiceMock.validarExistenciaUsuario).toHaveBeenCalledWith(idUsuario);
        expect(resultado).toEqual(notificacionesNoLeidasEsperadas);
        expect(resultado).toHaveLength(3);
        expect(repositorioMock.findAll).toHaveBeenCalledWith({ leida: false });
        expect(repositorioMock.findAll).toHaveBeenCalledTimes(1);
      });
    });

    describe('cuando no se aplican filtros', () => {
      test('debe retornar todas las notificaciones cuando se proporciona objeto de filtro vacío', async () => {
        const idUsuario = 'usuario123';
        usuarioServiceMock.validarExistenciaUsuario.mockResolvedValue(true);
        repositorioMock.findAll.mockResolvedValue(notificacionesEjemplo);

        const resultado = await servicio.obtenerNotificacionesUsuario(idUsuario, {});

        expect(usuarioServiceMock.validarExistenciaUsuario).toHaveBeenCalledWith(idUsuario);
        expect(resultado).toEqual(notificacionesEjemplo);
        expect(resultado).toHaveLength(5);
        expect(repositorioMock.findAll).toHaveBeenCalledWith({});
      });

      test('debe retornar todas las notificaciones cuando se proporciona filtro null', async () => {
        const idUsuario = 'usuario123';
        usuarioServiceMock.validarExistenciaUsuario.mockResolvedValue(true);
        repositorioMock.findAll.mockResolvedValue(notificacionesEjemplo);

        const resultado = await servicio.obtenerNotificacionesUsuario(idUsuario, null);

        expect(usuarioServiceMock.validarExistenciaUsuario).toHaveBeenCalledWith(idUsuario);
        expect(resultado).toEqual(notificacionesEjemplo);
        expect(repositorioMock.findAll).toHaveBeenCalledWith(null);
      });

      test('debe retornar todas las notificaciones cuando se proporciona filtro undefined', async () => {
        const idUsuario = 'usuario123';
        usuarioServiceMock.validarExistenciaUsuario.mockResolvedValue(true);
        repositorioMock.findAll.mockResolvedValue(notificacionesEjemplo);

        const resultado = await servicio.obtenerNotificacionesUsuario(idUsuario, undefined);

        expect(usuarioServiceMock.validarExistenciaUsuario).toHaveBeenCalledWith(idUsuario);
        expect(resultado).toEqual(notificacionesEjemplo);
        expect(repositorioMock.findAll).toHaveBeenCalledWith(undefined);
      });
    });

    describe('cuando se manejan casos extremos', () => {
      test('debe retornar arreglo vacío cuando no existen notificaciones', async () => {
        const idUsuario = 'usuario123';
        usuarioServiceMock.validarExistenciaUsuario.mockResolvedValue(true);
        repositorioMock.findAll.mockResolvedValue([]);

        const resultado = await servicio.obtenerNotificacionesUsuario(idUsuario, { leida: true });

        expect(usuarioServiceMock.validarExistenciaUsuario).toHaveBeenCalledWith(idUsuario);
        expect(resultado).toEqual([]);
        expect(resultado).toHaveLength(0);
        expect(repositorioMock.findAll).toHaveBeenCalledWith({ leida: true });
      });

      test('debe manejar objetos de filtro complejos con múltiples propiedades', async () => {
        const idUsuario = 'usuario123';
        const filtroComplejo = { leida: true, tipo: 'reserva', fechaDesde: '2024-01-01' };
        const notificacionesFiltradas = [notificacionesEjemplo[1]];
        usuarioServiceMock.validarExistenciaUsuario.mockResolvedValue(true);
        repositorioMock.findAll.mockResolvedValue(notificacionesFiltradas);

        const resultado = await servicio.obtenerNotificacionesUsuario(idUsuario, filtroComplejo);

        expect(usuarioServiceMock.validarExistenciaUsuario).toHaveBeenCalledWith(idUsuario);
        expect(resultado).toEqual(notificacionesFiltradas);
        expect(repositorioMock.findAll).toHaveBeenCalledWith(filtroComplejo);
      });

      test('debe propagar errores del repositorio', async () => {
        const idUsuario = 'usuario123';
        const errorRepositorio = new Error('Error de conexión a base de datos');

        usuarioServiceMock.validarExistenciaUsuario.mockResolvedValue(true);
        repositorioMock.findAll.mockRejectedValue(errorRepositorio);

        await expect(servicio.obtenerNotificacionesUsuario(idUsuario, {}))
          .rejects
          .toThrow('Error de conexión a base de datos');
      });
    });
  });

  describe('cuando el usuario no existe', () => {
    test('debe lanzar UsuarioNoExisteException cuando el usuario no existe', async () => {
      const idUsuarioInexistente = 'usuario999';

      usuarioServiceMock.validarExistenciaUsuario.mockRejectedValue(new UsuarioNoExisteException(idUsuarioInexistente));

      await expect(servicio.obtenerNotificacionesUsuario(idUsuarioInexistente, {}))
        .rejects
        .toThrow(UsuarioNoExisteException);

      expect(usuarioServiceMock.validarExistenciaUsuario).toHaveBeenCalledWith(idUsuarioInexistente);
      expect(repositorioMock.findAll).not.toHaveBeenCalled();
    });

    test('debe propagar errores del usuarioService', async () => {
      const idUsuario = 'usuario123';
      const errorUsuarioService = new Error('Error en validación de usuario');

      usuarioServiceMock.validarExistenciaUsuario.mockRejectedValue(errorUsuarioService);

      await expect(servicio.obtenerNotificacionesUsuario(idUsuario, {}))
        .rejects
        .toThrow('Error en validación de usuario');

      expect(usuarioServiceMock.validarExistenciaUsuario).toHaveBeenCalledWith(idUsuario);
      expect(repositorioMock.findAll).not.toHaveBeenCalled();
    });
  });

  describe('marcarComoLeida', () => {
    describe('cuando la notificacion existe y no está leída', () => {
      test('debe marcar exitosamente como leída una notificacion no leída', async () => {
        const idNotificacion = '1';
        const notificacionOriginal = {
          id: idNotificacion,
          mensaje: 'Nueva reserva recibida',
          leida: false,
          estaLeida: jest.fn(() => false),
          marcarComoLeida: jest.fn(function() {
            this.leida = true;
            this.fechaLeida = new Date();
          })
        };

        const notificacionGuardada = {
          ...notificacionOriginal,
          leida: true,
          fechaLeida: expect.any(Date)
        };

        repositorioMock.findById.mockResolvedValue(notificacionOriginal);
        repositorioMock.update.mockResolvedValue(notificacionGuardada);

        const resultado = await servicio.marcarComoLeida(idNotificacion);

        expect(repositorioMock.findById).toHaveBeenCalledWith(idNotificacion);
        expect(notificacionOriginal.estaLeida).toHaveBeenCalledTimes(1);
        expect(notificacionOriginal.marcarComoLeida).toHaveBeenCalledTimes(1);
        expect(repositorioMock.update).toHaveBeenCalledWith(idNotificacion,notificacionOriginal);
        expect(resultado).toEqual(notificacionGuardada);
      });

      test('debe manejar notificacion con cambios de estado complejos', async () => {
        const idNotificacion = '3';
        const notificacionOriginal = {
          id: idNotificacion,
          mensaje: 'Pago procesado exitosamente',
          leida: false,
          prioridad: 'alta',
          estaLeida: jest.fn(() => false),
          marcarComoLeida: jest.fn(function() {
            this.leida = true;
            this.fechaLeida = new Date();
            this.estadoProcesamiento = 'completado';
          })
        };

        repositorioMock.findById.mockResolvedValue(notificacionOriginal);
        repositorioMock.update.mockResolvedValue(notificacionOriginal);

        await servicio.marcarComoLeida(idNotificacion);

        expect(notificacionOriginal.marcarComoLeida).toHaveBeenCalled();
        expect(repositorioMock.update).toHaveBeenCalledWith(idNotificacion,notificacionOriginal);
      });
    });

    describe('cuando la notificacion existe y ya está leída', () => {
      test('debe retornar la notificacion sin cambios cuando ya está leída', async () => {
        const idNotificacion = '2';
        const notificacionYaLeida = {
          id: idNotificacion,
          mensaje: 'Reserva confirmada',
          leida: true,
          fechaLeida: new Date('2024-01-03'),
          estaLeida: jest.fn(() => true),
          marcarComoLeida: jest.fn()
        };

        repositorioMock.findById.mockResolvedValue(notificacionYaLeida);

        const resultado = await servicio.marcarComoLeida(idNotificacion);

        expect(repositorioMock.findById).toHaveBeenCalledWith(idNotificacion);
        expect(notificacionYaLeida.estaLeida).toHaveBeenCalledTimes(1);
        expect(notificacionYaLeida.marcarComoLeida).not.toHaveBeenCalled();
        expect(repositorioMock.update).not.toHaveBeenCalled();
        expect(resultado).toBe(notificacionYaLeida);
      });

      test('debe manejar notificacion que cambia de estado durante la verificación', async () => {
        const idNotificacion = '4';
        let estaLeida = true;
        const notificacion = {
          id: idNotificacion,
          mensaje: 'Calificación recibida',
          leida: true,
          estaLeida: jest.fn(() => {
            const estadoActual = estaLeida;
            estaLeida = false;
            return estadoActual;
          }),
          marcarComoLeida: jest.fn(function() {
            this.leida = true;
            this.fechaLeida = new Date();
          })
        };

        repositorioMock.findById.mockResolvedValue(notificacion);

        const resultado = await servicio.marcarComoLeida(idNotificacion);

        expect(notificacion.estaLeida).toHaveBeenCalledTimes(1);
        expect(notificacion.marcarComoLeida).not.toHaveBeenCalled();
        expect(resultado).toBe(notificacion);
      });
    });

    describe('cuando la notificacion no existe', () => {
      test('debe lanzar NotificacionNoExisteException cuando la notificacion es null', async () => {
        const idInexistente = '999';
        repositorioMock.findById.mockResolvedValue(null);

        await expect(servicio.marcarComoLeida(idInexistente))
          .rejects
          .toThrow(NotificacionNoExisteException);

        expect(repositorioMock.findById).toHaveBeenCalledWith(idInexistente);
        expect(repositorioMock.update).not.toHaveBeenCalled();
      });

      test('debe lanzar NotificacionNoExisteException cuando la notificacion es undefined', async () => {
        const idInexistente = '888';
        repositorioMock.findById.mockResolvedValue(undefined);

        await expect(servicio.marcarComoLeida(idInexistente))
          .rejects
          .toThrow(NotificacionNoExisteException);

        expect(repositorioMock.findById).toHaveBeenCalledWith(idInexistente);
        expect(repositorioMock.update).not.toHaveBeenCalled();
      });
    });

    describe('cuando se manejan casos extremos y entradas inválidas', () => {
      test('debe manejar ID de notificacion con cadena vacía', async () => {
        const idVacio = '';
        repositorioMock.findById.mockResolvedValue(null);

        await expect(servicio.marcarComoLeida(idVacio))
          .rejects
          .toThrow(NotificacionNoExisteException);

        expect(repositorioMock.findById).toHaveBeenCalledWith(idVacio);
      });

      test('debe manejar ID de notificacion null', async () => {
        const idNulo = null;
        repositorioMock.findById.mockResolvedValue(null);

        await expect(servicio.marcarComoLeida(idNulo))
          .rejects
          .toThrow(NotificacionNoExisteException);

        expect(repositorioMock.findById).toHaveBeenCalledWith(idNulo);
      });

      test('debe manejar ID de notificacion undefined', async () => {
        const idIndefinido = undefined;
        repositorioMock.findById.mockResolvedValue(null);

        await expect(servicio.marcarComoLeida(idIndefinido))
          .rejects
          .toThrow(NotificacionNoExisteException);

        expect(repositorioMock.findById).toHaveBeenCalledWith(idIndefinido);
      });

      test('debe manejar ID de notificacion muy largo', async () => {
        const idLargo = 'a'.repeat(1000);
        repositorioMock.findById.mockResolvedValue(null);

        await expect(servicio.marcarComoLeida(idLargo))
          .rejects
          .toThrow(NotificacionNoExisteException);

        expect(repositorioMock.findById).toHaveBeenCalledWith(idLargo);
      });

      test('debe manejar caracteres especiales en ID de notificacion', async () => {
        const idEspecial = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        repositorioMock.findById.mockResolvedValue(null);

        await expect(servicio.marcarComoLeida(idEspecial))
          .rejects
          .toThrow(NotificacionNoExisteException);

        expect(repositorioMock.findById).toHaveBeenCalledWith(idEspecial);
      });
    });

    describe('cuando fallan las operaciones del repositorio', () => {
      test('debe propagar errores del repositorio en findById', async () => {
        const idNotificacion = '1';
        const errorRepositorio = new Error('Fallo en consulta a base de datos');
        repositorioMock.findById.mockRejectedValue(errorRepositorio);

        await expect(servicio.marcarComoLeida(idNotificacion))
          .rejects
          .toThrow('Fallo en consulta a base de datos');

        expect(repositorioMock.findById).toHaveBeenCalledWith(idNotificacion);
        expect(repositorioMock.update).not.toHaveBeenCalled();
      });

      test('debe propagar errores del repositorio en update', async () => {
        const idNotificacion = '1';
        const notificacion = {
          id: idNotificacion,
          mensaje: 'Mensaje de prueba',
          leida: false,
          estaLeida: jest.fn(() => false),
          marcarComoLeida: jest.fn(function() {
            this.leida = true;
          })
        };
        const errorGuardado = new Error('Error al guardar notificacion');

        repositorioMock.findById.mockResolvedValue(notificacion);
        repositorioMock.update.mockRejectedValue(errorGuardado);

        await expect(servicio.marcarComoLeida(idNotificacion))
          .rejects
          .toThrow('Error al guardar notificacion');

        expect(repositorioMock.findById).toHaveBeenCalledWith(idNotificacion);
        expect(notificacion.estaLeida).toHaveBeenCalled();
        expect(notificacion.marcarComoLeida).toHaveBeenCalled();
        expect(repositorioMock.update).toHaveBeenCalledWith(idNotificacion,notificacion);
      });
    });

    describe('cuando el objeto notificacion tiene comportamiento inesperado', () => {
      test('debe manejar notificacion con método estaLeida que lanza error', async () => {
        const idNotificacion = '1';
        const notificacionDefectuosa = {
          id: idNotificacion,
          mensaje: 'Notificacion defectuosa',
          leida: false,
          estaLeida: jest.fn(() => {
            throw new Error('Método estaLeida falló');
          }),
          marcarComoLeida: jest.fn()
        };

        repositorioMock.findById.mockResolvedValue(notificacionDefectuosa);

        await expect(servicio.marcarComoLeida(idNotificacion))
          .rejects
          .toThrow('Método estaLeida falló');

        expect(repositorioMock.findById).toHaveBeenCalledWith(idNotificacion);
        expect(notificacionDefectuosa.estaLeida).toHaveBeenCalled();
        expect(notificacionDefectuosa.marcarComoLeida).not.toHaveBeenCalled();
        expect(repositorioMock.update).not.toHaveBeenCalled();
      });

      test('debe manejar notificacion con método marcarComoLeida que lanza error', async () => {
        const idNotificacion = '1';
        const notificacionDefectuosa = {
          id: idNotificacion,
          mensaje: 'Notificacion defectuosa',
          leida: false,
          estaLeida: jest.fn(() => false),
          marcarComoLeida: jest.fn(() => {
            throw new Error('Falló el método marcarComoLeida');
          })
        };

        repositorioMock.findById.mockResolvedValue(notificacionDefectuosa);

        await expect(servicio.marcarComoLeida(idNotificacion))
          .rejects
          .toThrow('Falló el método marcarComoLeida');

        expect(repositorioMock.findById).toHaveBeenCalledWith(idNotificacion);
        expect(notificacionDefectuosa.estaLeida).toHaveBeenCalled();
        expect(notificacionDefectuosa.marcarComoLeida).toHaveBeenCalled();
        expect(repositorioMock.update).not.toHaveBeenCalled();
      });
    });
  });
});