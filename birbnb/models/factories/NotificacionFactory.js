import { Notificacion } from "../entities/Notificacion.js";

export class NotificacionFactory {

    static crearNotificacionReservaCreada(datos) {
        const mensaje =
            `Nueva reserva realizada por ${datos.huesped} sobre el alojamiento ${datos.alojamiento} para el ${datos.fechaInicio} (${datos.cantidadDias} días).`;
        return new Notificacion(datos.anfitrion, mensaje, new Date(),false,null);
    }

    static crearNotificacionReservaCancelada(datos) {
        const mensaje =
            `El huésped ${datos.huesped} canceló la reserva del alojamiento ${datos.alojamiento} para el ${datos.fechaInicio}. Motivo: ${datos.motivo}.`;
        return new Notificacion(datos.anfitrion, mensaje, new Date(),false,null);
    }

    static crearNotificacionReservaAceptada(datos) {
      const mensaje = `Tu reserva para el alojamiento "${datos.alojamiento}" fue aceptada.`;
      return new Notificacion(datos.huesped, mensaje);
    }
}

  
  