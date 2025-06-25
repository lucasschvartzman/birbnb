import { beforeEach, describe, expect, test, jest, afterEach } from '@jest/globals';
import { ReservaService } from "../src/services/reservaService.js";
import {
  DatosReservaInvalidosException,
  ReservaNoExisteException,
} from "../src/exceptions/reservaExceptions.js";
import { EstadoReserva } from "../src/models/entities/EstadoReserva.js";
import {UsuarioNoExisteException} from "../src/exceptions/usuarioExceptions.js";
import {AlojamientoNoExisteException} from "../src/exceptions/alojamientoExceptions.js";
import {DatosAlojamientoInvalidosException} from "../src/exceptions/alojamientoExceptions.js";

describe("ReservaService", () => {
  let service;
  let reservaRepositoryMock;
  let alojamientoRepositoryMock;
  let notificacionServiceMock;
  let usuarioServiceMock;

  const datosReservaEjemplo = {
    valida: {
      alojamiento: "alojamiento-123",
      rangoFechas: {
        desde: new Date("2025-07-01"),
        hasta: new Date("2025-07-03"),
        fechaInicio: new Date("2025-07-01"),
        fechaFin: new Date("2025-07-03"),
        calcularCantidadDias: () => 2,
      },
      huespedReservador: "usuario-456",
      cantidadHuespedes: 2,
      precioPorNoche: 100,
    },
    modificacion: {
      alojamiento: "alojamiento-789",
      rangoFechas: {
        desde: new Date("2025-08-01"),
        hasta: new Date("2025-08-05"),
        fechaInicio: new Date("2025-08-01"),
        fechaFin: new Date("2025-08-05"),
        calcularCantidadDias: () => 4,
      },
      cantidadHuespedes: 3,
      precioPorNoche: 150,
    },
  };

  const alojamientosEjemplo = {
    disponible: {
      id: "alojamiento-123",
      nombre: "Casa de Playa",
      anfitrion: { id: "anfitrion-1", nombre: "Juan Pérez" },
      estaDisponibleEn: jest.fn().mockReturnValue(true),
      tieneCapacidadPara: jest.fn().mockReturnValue(true),
    },
    noDisponible: {
      id: "alojamiento-456",
      nombre: "Departamento Centro",
      anfitrion: { id: "anfitrion-2", nombre: "María García" },
      estaDisponibleEn: jest.fn().mockReturnValue(false),
      tieneCapacidadPara: jest.fn().mockReturnValue(true),
    },
    sinCapacidad: {
      id: "alojamiento-789",
      nombre: "Cabaña Montaña",
      anfitrion: { id: "anfitrion-3", nombre: "Carlos López" },
      estaDisponibleEn: jest.fn().mockReturnValue(true),
      tieneCapacidadPara: jest.fn().mockReturnValue(false),
    },
  };

  function crearReservaMock(datos = {}) {
    return {
      estaIniciada: jest.fn().mockReturnValue(false),
      estaCancelada: jest.fn().mockReturnValue(false),
      actualizarEstado: jest.fn(),
      ...datos
    };
  }

  const reservasEjemplo = {
    pendiente: crearReservaMock({
      id: "reserva-1",
      estado: EstadoReserva.PENDIENTE,
      huespedReservador: "usuario-456",
      alojamiento: "alojamiento-123",
      rangoFechas: {
        ...datosReservaEjemplo.valida.rangoFechas,
        fechaFin: new Date("2025-07-03"),
      },
    }),
    iniciada: crearReservaMock({
      id: "reserva-2",
      estado: EstadoReserva.PENDIENTE,
      estaIniciada: jest.fn().mockReturnValue(true),
    }),
    cancelada: crearReservaMock({
      id: "reserva-3",
      estado: EstadoReserva.CANCELADA,
      huespedReservador: "usuario-456",
      alojamiento: "alojamiento-123",
      estaCancelada: jest.fn().mockReturnValue(true),
    }),
  };

  const usuariosEjemplo = {
    huesped: {
      id: "usuario-456",
      nombre: "Ana Rodríguez",
      email: "ana@ejemplo.com",
    },
  };

  beforeEach(() => {
    reservaRepositoryMock = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    alojamientoRepositoryMock = {
      findById: jest.fn(),
    };

    notificacionServiceMock = {
      generarNotificacionCancelacion: jest.fn(),
      generarNotificacionCreacion: jest.fn()
    };

    usuarioServiceMock = {
      obtenerUsuarioPorId: jest.fn(),
      validarExistenciaUsuario: jest.fn()
    };

    jest.clearAllMocks();

    service = new ReservaService(
      reservaRepositoryMock,
      alojamientoRepositoryMock,
      notificacionServiceMock,
      usuarioServiceMock
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("crearReserva", () => {
    describe("cuando los datos son válidos", () => {
      test("debe crear una reserva exitosamente con estado PENDIENTE", async () => {
        const reservaGuardada = {
          id: "reserva-nueva",
          ...datosReservaEjemplo.valida,
          fechaAlta: expect.any(Date),
          estado: EstadoReserva.PENDIENTE.nombre,
        };

        alojamientoRepositoryMock.findById.mockResolvedValue(alojamientosEjemplo.disponible);
        reservaRepositoryMock.create.mockResolvedValue(reservaGuardada);

        const resultado = await service.crearReserva(datosReservaEjemplo.valida);

        expect(resultado).toEqual(reservaGuardada);
        expect(reservaRepositoryMock.create).toHaveBeenCalledWith({
          ...datosReservaEjemplo.valida,
          fechaAlta: expect.any(Date),
          estado: EstadoReserva.PENDIENTE,
        });
        expect(reservaRepositoryMock.create).toHaveBeenCalledTimes(1);
      });

      test("debe generar notificación de creación", async () => {
        const reservaGuardada = {
          id: "reserva-nueva",
          ...datosReservaEjemplo.valida,
          fechaAlta: expect.any(Date),
          estado: EstadoReserva.PENDIENTE.nombre,
        };

        alojamientoRepositoryMock.findById.mockResolvedValue(alojamientosEjemplo.disponible);
        reservaRepositoryMock.create.mockResolvedValue(reservaGuardada);

        await service.crearReserva(datosReservaEjemplo.valida);

        expect(notificacionServiceMock.generarNotificacionCreacion)
          .toHaveBeenCalledWith({
            ...datosReservaEjemplo.valida,
            fechaAlta: expect.any(Date),
            estado: EstadoReserva.PENDIENTE,
          }, alojamientosEjemplo.disponible);
        expect(notificacionServiceMock.generarNotificacionCreacion).toHaveBeenCalledTimes(1);
      });
    });

    describe("cuando el alojamiento no existe", () => {
      test("debe lanzar AlojamientoNoExisteException", async () => {
        alojamientoRepositoryMock.findById.mockResolvedValue(null);

        await expect(service.crearReserva(datosReservaEjemplo.valida))
          .rejects.toThrow(AlojamientoNoExisteException);

        expect(alojamientoRepositoryMock.findById).toHaveBeenCalledWith(datosReservaEjemplo.valida.alojamiento);
        expect(reservaRepositoryMock.create).not.toHaveBeenCalled();
        expect(notificacionServiceMock.generarNotificacionCreacion).not.toHaveBeenCalled();
      });
    });

    describe("cuando el alojamiento no está disponible", () => {
      test("debe lanzar DatosAlojamientoInvalidosException", async () => {
        alojamientoRepositoryMock.findById.mockResolvedValue(alojamientosEjemplo.noDisponible);

        await expect(service.crearReserva(datosReservaEjemplo.valida))
          .rejects.toThrow(DatosAlojamientoInvalidosException);

        expect(alojamientosEjemplo.noDisponible.estaDisponibleEn)
          .toHaveBeenCalledWith(datosReservaEjemplo.valida.rangoFechas);
        expect(reservaRepositoryMock.create).not.toHaveBeenCalled();
        expect(notificacionServiceMock.generarNotificacionCreacion).not.toHaveBeenCalled();
      });
    });

    describe("cuando el alojamiento no tiene capacidad suficiente", () => {
      test("debe lanzar DatosAlojamientoInvalidosException", async () => {
        alojamientoRepositoryMock.findById.mockResolvedValue(alojamientosEjemplo.sinCapacidad);

        await expect(service.crearReserva(datosReservaEjemplo.valida))
          .rejects.toThrow(DatosAlojamientoInvalidosException);

        expect(alojamientosEjemplo.sinCapacidad.tieneCapacidadPara)
          .toHaveBeenCalledWith(datosReservaEjemplo.valida.cantidadHuespedes);
        expect(reservaRepositoryMock.create).not.toHaveBeenCalled();
        expect(notificacionServiceMock.generarNotificacionCreacion).not.toHaveBeenCalled();
      });
    });
  });

  describe("cancelarReserva", () => {
    const motivoCancelacion = "Cambio de planes del usuario";

    describe("cuando la reserva puede ser cancelada", () => {
      test("debe cancelar la reserva exitosamente", async () => {
        const reservaActualizada = {
          estado: EstadoReserva.CANCELADA,
          ...reservasEjemplo.pendiente
        };

        reservaRepositoryMock.findById.mockResolvedValue(reservasEjemplo.pendiente);
        reservaRepositoryMock.update.mockResolvedValue(reservaActualizada);

        const resultado = await service.cancelarReserva("reserva-1", motivoCancelacion);

        expect(reservasEjemplo.pendiente.estaCancelada).toHaveBeenCalledTimes(1);
        expect(reservasEjemplo.pendiente.actualizarEstado)
          .toHaveBeenCalledWith(EstadoReserva.CANCELADA);
        expect(reservaRepositoryMock.update).toHaveBeenCalledWith("reserva-1", reservasEjemplo.pendiente);
        expect(resultado).toEqual(reservaActualizada);
      });

      test("debe generar notificación de cancelación", async () => {
        const reservaActualizada = {
          estado: EstadoReserva.CANCELADA,
          ...reservasEjemplo.pendiente
        };

        reservaRepositoryMock.findById.mockResolvedValue(reservasEjemplo.pendiente);
        reservaRepositoryMock.update.mockResolvedValue(reservaActualizada);

        await service.cancelarReserva("reserva-1", motivoCancelacion);

        expect(notificacionServiceMock.generarNotificacionCancelacion)
          .toHaveBeenCalledWith(reservaActualizada, motivoCancelacion);
        expect(notificacionServiceMock.generarNotificacionCancelacion).toHaveBeenCalledTimes(1);
      });

      test("debe retornar la reserva sin modificar cuando ya está cancelada", async () => {
        reservaRepositoryMock.findById.mockResolvedValue(reservasEjemplo.cancelada);

        const resultado = await service.cancelarReserva("reserva-3", motivoCancelacion);

        expect(reservasEjemplo.cancelada.estaCancelada).toHaveBeenCalledTimes(1);
        expect(reservasEjemplo.cancelada.actualizarEstado).not.toHaveBeenCalled();
        expect(reservaRepositoryMock.update).not.toHaveBeenCalled();
        expect(notificacionServiceMock.generarNotificacionCancelacion).not.toHaveBeenCalled();
        expect(resultado).toEqual(reservasEjemplo.cancelada);
      });
    });

    describe("cuando la reserva no existe", () => {
      test("debe lanzar ReservaNoExisteException", async () => {
        reservaRepositoryMock.findById.mockResolvedValue(null);

        await expect(service.cancelarReserva("reserva-inexistente", motivoCancelacion))
          .rejects.toThrow(ReservaNoExisteException);

        expect(reservaRepositoryMock.update).not.toHaveBeenCalled();
        expect(notificacionServiceMock.generarNotificacionCancelacion).not.toHaveBeenCalled();
      });
    });

    describe("cuando la reserva ya está iniciada", () => {
      test("debe lanzar DatosReservaInvalidosException", async () => {
        reservaRepositoryMock.findById.mockResolvedValue(reservasEjemplo.iniciada);

        await expect(service.cancelarReserva("reserva-2", motivoCancelacion))
          .rejects.toThrow(DatosReservaInvalidosException);

        expect(reservasEjemplo.iniciada.estaIniciada).toHaveBeenCalledWith(expect.any(Date));
        expect(reservaRepositoryMock.update).not.toHaveBeenCalled();
        expect(notificacionServiceMock.generarNotificacionCancelacion).not.toHaveBeenCalled();
      });
    });
  });

  describe("modificarReserva", () => {
    const idReserva = "reserva-1";

    describe("cuando los nuevos datos son válidos", () => {
      test("debe modificar la reserva exitosamente", async () => {
        const reservaModificada = {
          id: idReserva,
          estado: EstadoReserva.PENDIENTE,
          ...datosReservaEjemplo.modificacion,
        };

        alojamientoRepositoryMock.findById.mockResolvedValue(alojamientosEjemplo.disponible);
        reservaRepositoryMock.update.mockResolvedValue(reservaModificada);

        const resultado = await service.modificarReserva(idReserva, datosReservaEjemplo.modificacion);

        expect(reservaRepositoryMock.update).toHaveBeenCalledWith(idReserva, {
          ...datosReservaEjemplo.modificacion,
          estado: EstadoReserva.PENDIENTE
        });
        expect(resultado).toEqual(reservaModificada);
      });

      test("debe validar disponibilidad y capacidad del nuevo alojamiento", async () => {
        alojamientoRepositoryMock.findById.mockResolvedValue(alojamientosEjemplo.disponible);
        reservaRepositoryMock.update.mockResolvedValue({});

        await service.modificarReserva(idReserva, datosReservaEjemplo.modificacion);

        expect(alojamientosEjemplo.disponible.estaDisponibleEn)
          .toHaveBeenCalledWith(datosReservaEjemplo.modificacion.rangoFechas);
        expect(alojamientosEjemplo.disponible.tieneCapacidadPara)
          .toHaveBeenCalledWith(datosReservaEjemplo.modificacion.cantidadHuespedes);
      });
    });

    describe("cuando el nuevo alojamiento no existe", () => {
      test("debe lanzar AlojamientoNoExisteException", async () => {
        alojamientoRepositoryMock.findById.mockResolvedValue(null);

        await expect(service.modificarReserva(idReserva, datosReservaEjemplo.modificacion))
          .rejects.toThrow(AlojamientoNoExisteException);

        expect(reservaRepositoryMock.update).not.toHaveBeenCalled();
      });
    });

    describe("cuando el nuevo alojamiento no está disponible", () => {
      test("debe lanzar DatosAlojamientoInvalidosException", async () => {
        alojamientoRepositoryMock.findById.mockResolvedValue(alojamientosEjemplo.noDisponible);

        await expect(service.modificarReserva(idReserva, datosReservaEjemplo.modificacion))
          .rejects.toThrow(DatosAlojamientoInvalidosException);

        expect(reservaRepositoryMock.update).not.toHaveBeenCalled();
      });
    });

    describe("cuando el nuevo alojamiento no tiene capacidad suficiente", () => {
      test("debe lanzar DatosAlojamientoInvalidosException", async () => {
        alojamientoRepositoryMock.findById.mockResolvedValue(alojamientosEjemplo.sinCapacidad);

        await expect(service.modificarReserva(idReserva, datosReservaEjemplo.modificacion))
          .rejects.toThrow(DatosAlojamientoInvalidosException);

        expect(reservaRepositoryMock.update).not.toHaveBeenCalled();
      });
    });
  });

  describe("obtenerHistorialPorUsuario", () => {
    const idUsuario = "usuario-456";

    describe("cuando se solicita el historial de un usuario", () => {
      test("debe retornar todas las reservas del usuario", async () => {
        const historialEsperado = [
          { id: "reserva-1", huespedReservador: idUsuario },
          { id: "reserva-2", huespedReservador: idUsuario },
          { id: "reserva-3", huespedReservador: idUsuario },
        ];

        usuarioServiceMock.validarExistenciaUsuario.mockResolvedValue(true);
        reservaRepositoryMock.findAll.mockResolvedValue(historialEsperado);

        const resultado = await service.obtenerHistorialPorUsuario(idUsuario);

        expect(usuarioServiceMock.validarExistenciaUsuario).toHaveBeenCalledWith(idUsuario);
        expect(reservaRepositoryMock.findAll).toHaveBeenCalledWith({ idUsuario });
        expect(reservaRepositoryMock.findAll).toHaveBeenCalledTimes(1);
        expect(resultado).toEqual(historialEsperado);
        expect(resultado).toHaveLength(3);
      });

      test("debe retornar array vacío cuando el usuario no tiene reservas", async () => {
        usuarioServiceMock.validarExistenciaUsuario.mockResolvedValue(true);
        reservaRepositoryMock.findAll.mockResolvedValue([]);

        const resultado = await service.obtenerHistorialPorUsuario(idUsuario);

        expect(usuarioServiceMock.validarExistenciaUsuario).toHaveBeenCalledWith(idUsuario);
        expect(resultado).toEqual([]);
        expect(resultado).toHaveLength(0);
      });
    });

    describe("cuando se proporciona un ID de usuario inválido", () => {
      test("debe propagar errores del usuarioService", async () => {
        const errorUsuarioService = new Error('Error en validación de usuario');

        usuarioServiceMock.validarExistenciaUsuario.mockRejectedValue(errorUsuarioService);

        await expect(service.obtenerHistorialPorUsuario(idUsuario))
          .rejects
          .toThrow('Error en validación de usuario');

        expect(usuarioServiceMock.validarExistenciaUsuario).toHaveBeenCalledWith(idUsuario);
        expect(reservaRepositoryMock.findAll).not.toHaveBeenCalled();
      });
    });
  });
});