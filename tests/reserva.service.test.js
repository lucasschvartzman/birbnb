import { jest } from "@jest/globals";
import { ReservaService } from "../birbnb/services/reservaService.js";
import {
  ReservaInvalida,
  ReservaNoExiste,
} from "../birbnb/excepciones/reservas.js";
import { EstadoReserva } from "../birbnb/models/entities/EstadoReserva.js";

describe("ReservaService - integración con alojamiento y reservas", () => {
  let reservaRepo, alojamientoRepo, service;

  beforeEach(() => {
    reservaRepo = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    alojamientoRepo = {
      findById: jest.fn(),
    };

    service = new ReservaService(reservaRepo, alojamientoRepo);
  });

  describe("crearReserva()", () => {
    const dto = {
      alojamiento: "A1",
      rangoFechas: {
        desde: new Date("2025-07-01"),
        hasta: new Date("2025-07-03"),
      },
      huespedReservador: "user@mail.com",
      cantidadHuespedes: 2,
      precioPorNoche: 100,
    };

    it("lanza ReservaNoExiste si no encuentra el alojamiento", async () => {
      alojamientoRepo.findById.mockResolvedValue(null);

      await expect(service.crearReserva(dto)).rejects.toThrow(ReservaNoExiste);
    });

    it("lanza ReservaInvalida si no hay disponibilidad", async () => {
      alojamientoRepo.findById.mockResolvedValue({
        estaDisponibleEn: () => false,
      });

      await expect(service.crearReserva(dto)).rejects.toThrow(ReservaInvalida);
    });

    it("lanza ReservaInvalida si no hay capacidad", async () => {
      alojamientoRepo.findById.mockResolvedValue({
        estaDisponibleEn: () => true,
        tieneCapacidadPara: () => false,
      });

      await expect(service.crearReserva(dto)).rejects.toThrow(ReservaInvalida);
    });

    it("crea reserva si todo es válido", async () => {
      const mockAlojamiento = {
        estaDisponibleEn: () => true,
        tieneCapacidadPara: () => true,
      };

      const mockSaved = {
        id: "R1",
        ...dto,
        estado: EstadoReserva.PENDIENTE.nombre,
      };

      alojamientoRepo.findById.mockResolvedValue(mockAlojamiento);
      reservaRepo.save.mockResolvedValue(mockSaved);

      const result = await service.crearReserva(dto);

      expect(reservaRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          ...dto,
          estado: EstadoReserva.PENDIENTE.nombre,
        })
      );
      expect(result).toEqual(mockSaved);
    });
  });

  describe("cancelarReserva()", () => {
    const id = "R2";

    it("lanza ReservaInvalida si ya inició", async () => {
      reservaRepo.findById.mockResolvedValue({
        estaIniciada: () => true,
      });

      await expect(service.cancelarReserva(id, "motivo")).rejects.toThrow(
        ReservaInvalida
      );
    });

    it("cancela si no inició", async () => {
      const mockReserva = {
        id,
        estado: EstadoReserva.PENDIENTE.nombre,
        estaIniciada: () => false,
        actualizarEstado: function (nuevoEstado) {
          this.estado = nuevoEstado;
        },
        toObject: function () {
          return {
            id: this.id,
            estado: this.estado,
            huespedReservador: "x",
            cantidadHuespedes: 1,
            alojamiento: "A1",
            rangoFechas: {},
            precioPorNoche: 50,
          };
        },
      };

      reservaRepo.findById.mockResolvedValue(mockReserva);
      reservaRepo.save.mockImplementation(async (reserva) => reserva); // simula persistencia

      const result = await service.cancelarReserva(id, "motivo");

      expect(reservaRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id,
          estado: EstadoReserva.CANCELADA.nombre,
        })
      );

      expect(result.estado).toBe(EstadoReserva.CANCELADA.nombre);
    });
  });

  describe("modificarReserva()", () => {
    const id = "R3";
    const cambios = {
      alojamiento: "A1",
      rangoFechas: {},
      cantidadHuespedes: 3,
    };

    it("lanza ReservaNoExiste si el alojamiento no existe", async () => {
      alojamientoRepo.findById.mockResolvedValue(null);

      await expect(service.modificarReserva(id, cambios)).rejects.toThrow(
        ReservaNoExiste
      );
    });

    it("lanza ReservaInvalida si no hay disponibilidad", async () => {
      alojamientoRepo.findById.mockResolvedValue({
        estaDisponibleEn: () => false,
      });

      await expect(service.modificarReserva(id, cambios)).rejects.toThrow(
        ReservaInvalida
      );
    });

    it("lanza ReservaInvalida si no hay capacidad", async () => {
      alojamientoRepo.findById.mockResolvedValue({
        estaDisponibleEn: () => true,
        tieneCapacidadPara: () => false,
      });

      await expect(service.modificarReserva(id, cambios)).rejects.toThrow(
        ReservaInvalida
      );
    });

    it("modifica si todo es válido", async () => {
      alojamientoRepo.findById.mockResolvedValue({
        estaDisponibleEn: () => true,
        tieneCapacidadPara: () => true,
      });

      const expected = {
        id,
        ...cambios,
        estado: EstadoReserva.PENDIENTE.nombre,
      };

      reservaRepo.save.mockResolvedValue(expected);

      const result = await service.modificarReserva(id, cambios);

      expect(reservaRepo.save).toHaveBeenCalledWith(expected);
      expect(result).toEqual(expected);
    });
  });

  describe("obtenerHistorialPorUsuario()", () => {
    it("devuelve historial desde el repositorio", async () => {
      const reservas = [{ id: "1" }, { id: "2" }];
      reservaRepo.findAll.mockResolvedValue(reservas);

      const result = await service.obtenerHistorialPorUsuario("user123");

      expect(reservaRepo.findAll).toHaveBeenCalledWith({
        idUsuario: "user123",
      });
      expect(result).toEqual(reservas);
    });
  });
});
