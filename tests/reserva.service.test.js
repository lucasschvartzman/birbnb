import { jest } from '@jest/globals';
import { ReservaInvalida } from "../birbnb/excepciones/reservas.js";
import { ReservaService } from "../birbnb/services/reservaService.js";

describe('ReservaService - métodos CRUD básicos', () => {
    let service;
    let mockRepo;

    beforeEach(() => {
        mockRepo = {
            alojamientoEstaDisponible: jest.fn(),
            crearReserva: jest.fn(),
            obtenerPorId: jest.fn(),
            cancelarReserva: jest.fn(),
            modificarReserva: jest.fn(),
            buscarPorUsuario: jest.fn(),
        };
        service = new ReservaService(mockRepo);
    });

    describe('crearReserva()', () => {
        const dto = {
            alojamientoId: 'A1',
            rangoFechas: { desde: new Date('2025-06-01'), hasta: new Date('2025-06-03') },
            huespedReservador: 'u@mail.com',
            cantidadHuespedes: 2,
            precioPorNoche: 100,
        };

        it('debe lanzar ReservaInvalida si no hay disponibilidad', async () => {
            mockRepo.alojamientoEstaDisponible.mockResolvedValue(false);
            await expect(service.crearReserva(dto)).rejects.toThrow(ReservaInvalida);
            expect(mockRepo.alojamientoEstaDisponible)
                .toHaveBeenCalledWith(dto.alojamientoId, dto.rangoFechas);
        });

        it('debe delegar creación si hay disponibilidad', async () => {
            mockRepo.alojamientoEstaDisponible.mockResolvedValue(true);
            const expected = { id: 'R1', ...dto, estado: 'PENDIENTE', fechaAlta: expect.any(Date) };
            mockRepo.crearReserva.mockResolvedValue(expected);

            const result = await service.crearReserva(dto);
            expect(mockRepo.crearReserva).toHaveBeenCalled();
            expect(result).toEqual(expected);
        });
    });

    describe('cancelarReserva()', () => {
        const id = 'R2', motivo = 'cambio';

        it('debe lanzar ReservaInvalida si la reserva ya inició', async () => {
            mockRepo.obtenerPorId.mockResolvedValue({
                rangoFechas: { desde: new Date(Date.now() - 86400000) }
            });
            await expect(service.cancelarReserva(id, motivo)).rejects.toThrow(ReservaInvalida);
            expect(mockRepo.obtenerPorId).toHaveBeenCalledWith(id);
        });

        it('debe delegar cancelación si no inició', async () => {
            mockRepo.obtenerPorId.mockResolvedValue({
                rangoFechas: { desde: new Date(Date.now() + 86400000) }
            });
            mockRepo.cancelarReserva.mockResolvedValue(true);

            const result = await service.cancelarReserva(id, motivo);
            expect(mockRepo.cancelarReserva).toHaveBeenCalledWith(id, motivo);
            expect(result).toBe(true);
        });
    });

    describe('modificarReserva()', () => {
        const id = 'R3';
        const cambios = { rangoFechas: { desde: new Date('2025-07-01'), hasta: new Date('2025-07-05') } };

        it('debe lanzar ReservaInvalida si las fechas no son válidas', async () => {
            const mockRes = { estaVigenteEn: jest.fn().mockReturnValue(false) };
            mockRepo.obtenerPorId.mockResolvedValue(mockRes);

            await expect(service.modificarReserva(id, cambios)).rejects.toThrow(ReservaInvalida);
            expect(mockRepo.obtenerPorId).toHaveBeenCalledWith(id);
            expect(mockRes.estaVigenteEn).toHaveBeenCalledWith(cambios.rangoFechas);
        });

        it('debe delegar modificación si las fechas son válidas', async () => {
            const mockRes = { estaVigenteEn: jest.fn().mockReturnValue(true) };
            mockRepo.obtenerPorId.mockResolvedValue(mockRes);
            mockRepo.modificarReserva.mockResolvedValue({ id, ...cambios });

            const result = await service.modificarReserva(id, cambios);
            expect(mockRepo.modificarReserva).toHaveBeenCalledWith(id, cambios);
            expect(result.id).toBe(id);
        });
    });

    describe('obtenerHistorialPorUsuario()', () => {
        it('debe devolver el historial que retorna el repo', async () => {
            const history = ['res1', 'res2'];
            mockRepo.buscarPorUsuario.mockResolvedValue(history);

            const result = await service.obtenerHistorialPorUsuario('user@mail.com');
            expect(mockRepo.buscarPorUsuario).toHaveBeenCalledWith('user@mail.com');
            expect(result).toEqual(history);
        });
    });
});