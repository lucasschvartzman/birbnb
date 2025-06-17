import { Notificacion } from "../entities/Notificacion.js";

export class NotificacionFactory {

    static crearNotificacionReservaCreada({ huesped, alojamiento, fechaInicio, cantidadDias, anfitrion }) {
        const mensaje = `Nueva reserva realizada por ${huesped} sobre el alojamiento ${alojamiento} para el ${fechaInicio} (${cantidadDias} días).`;
        return new Notificacion(anfitrion, mensaje, new Date(), false, null);
    }

    static crearNotificacionReservaCancelada({ huesped, alojamiento, fechaInicio, motivo, anfitrion }) {
        const mensaje = `El huésped ${huesped} canceló la reserva del alojamiento ${alojamiento} para el ${fechaInicio}. Motivo: ${motivo}.`;
        return new Notificacion(anfitrion, mensaje, new Date(), false, null);
    }

    static crearNotificacionReservaAceptada({ huesped, alojamiento }) {
        const mensaje = `Tu reserva para el alojamiento "${alojamiento}" fue aceptada.`;
        return new Notificacion(huesped, mensaje);
    }
}