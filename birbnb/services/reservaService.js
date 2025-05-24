import { ReservaInvalida, ReservaNoExiste } from "../excepciones/reservas.js";

export class ReservaService {

  constructor(reservaRepository) {
    this.reservaRepository = reservaRepository;
  }

  async crearReserva(datos) {
    // 1) Validar disponibilidad
    const ok = await this.repo.alojamientoEstaDisponible(datos.alojamientoId, datos.rangoFechas);
    if (!ok) throw new ReservaInvalida("Alojamiento no disponible en esas fechas");
    // 2) Delegar creación
    return this.repo.crearReserva({
      ...datos,
      fechaAlta: new Date(),
      estado: "PENDIENTE"
    });
  }

  async cancelarReserva(id, motivo) {
    const res = await this.repo.obtenerPorId(id);
    if (new Date(res.rangoFechas.desde) <= new Date()) {
      throw new ReservaInvalida("Ya iniciada, no puede cancelarse");
    }
    return this.repo.cancelarReserva(id, motivo);
  }

  async modificarReserva(id, cambios) {
    // Verifico existencia y fechas libres (excluyo esta reserva)
    const reserva = await this.repo.obtenerPorId(id);
    const ok = reserva.estaVigenteEn(
      cambios.rangoFechas
    ); // es una validacion 
    if (!ok) throw new ReservaInvalida("Fechas no disponibles para modificación");
    return this.repo.modificarReserva(id, cambios);
  }

  async obtenerHistorialPorUsuario(email) {
    return this.repo.buscarPorUsuario(email);
  }
}
