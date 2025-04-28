const Notificacion = require('./Notificacion');

class FactoryNotificacion {
    static crearNotificacionReservaCreada(reserva) {
      const mensaje = `Nueva reserva de ${reserva.huespedReservador.nombre}.`;
      return new Notificacion(reserva.alojamiento.anfitrion, mensaje)
    }
  
    static crearNotificacionReservaAceptada(reserva) {
      const mensaje = `Tu reserva para el alojamiento "${reserva.alojamiento.nombre}" fue aceptada por el anfitrión.`;
      return new Notificacion(reserva.huespedReservador, mensaje);
    }
  
    static crearNotificacionReservaCancelada(reserva, motivo) {
      const mensaje = `El huésped ${reserva.huespedReservador.nombre} canceló la reserva del alojamiento "${reserva.alojamiento.nombre}". Motivo: ${motivo || "No especificado"}.`;
      return new Notificacion(reserva.alojamiento.anfitrion, mensaje);
    }
}
module.exports = FactoryNotificacion;

  
  