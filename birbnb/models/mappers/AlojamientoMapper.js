import {Caracteristica} from "../entities/Caracteristica.js";

export class AlojamientoMapper {

  static obtenerFiltrosBusqueda(queryParameters) {
    return {
      idCiudad: queryParameters.idCiudad,
      idPais: queryParameters.idPais,
      latitud: queryParameters.latitud ? parseFloat(queryParameters.latitud) : undefined,
      longitud: queryParameters.longitud ? parseFloat(queryParameters.longitud) : undefined,
      precioMinimo: queryParameters.precioMinimo ? parseFloat(queryParameters.precioMinimo) : undefined,
      precioMaximo: queryParameters.precioMaximo ? parseFloat(queryParameters.precioMaximo) : undefined,
      huespedes: queryParameters.huespedes ? parseInt(queryParameters.huespedes) : undefined,
      caracteristicas: this.#mapearCaracteristicas(queryParameters.caracteristicas)
    };
  }

  static toDto(alojamiento) {
    return {
      nombre: alojamiento.nombre,
      descripcion: alojamiento.descripcion,
      direccion: alojamiento.direccion ? this.#toDireccionDto(alojamiento.direccion) : undefined,
      precioPorNoche: alojamiento.precioPorNoche,
      cantHuespedesMax: alojamiento.cantHuespedesMax,
      moneda: alojamiento.moneda.nombre,
      horarioCheckIn: alojamiento.horarioCheckIn,
      horarioCheckOut: alojamiento.horarioCheckOut,
      caracteristicas: alojamiento.caracteristicas
    };
  }

  static #mapearCaracteristicas(caracteristicas) {
    if (!caracteristicas) return caracteristicas;
    const caracteristicasValidas = Caracteristica.getAllAsString();
    const arrayCaracteristicas = caracteristicas.trim().split(",");
    return arrayCaracteristicas.filter((c) => caracteristicasValidas.includes(c.trim()));
  }

  static #toDireccionDto(direccion) {
    return {
      calle: direccion.calle,
      altura: direccion.altura,
      coordenadas: {
        latitud: direccion.latitud,
        longitud: direccion.longitud
      },
      ciudad: {
        nombre: direccion.ciudad.nombre,
        pais: direccion.ciudad.pais.nombre
      },
    };
  }

}