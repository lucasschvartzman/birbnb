import { Caracteristica } from "../models/entities/Caracteristica.js";
import { FiltrosAlojamientoInvalidosException } from "../exceptions/alojamientoExceptions.js";
import mongoose from "mongoose";

export class AlojamientoController {
  constructor(alojamientoRepository) {
    this.alojamientoRepository = alojamientoRepository;
  }

  #mapearCaracteristicas = (caracteristicas) => {
    if (!caracteristicas) return caracteristicas;
    const caracteristicasValidas = Caracteristica.getAllAsString();
    const arrayDeCaracteristicas = caracteristicas.trim().split(",");
    return arrayDeCaracteristicas.filter((c) =>
      caracteristicasValidas.includes(c.trim())
    );
  };

  #esStringValido = (valor) => {
    return typeof valor === "string" && valor.trim().length !== 0;
  };

  #esNumeroPositivo = (valor) => {
    return !isNaN(valor) && valor > 0;
  };

  #obtenerMensajeStringInvalido = (parametro) => {
    return `El parámetro '${parametro}' debe ser un string válido.`;
  };

  #obtenerMensajeIdInvalido = (parametro) => {
    return `El parámetro '${parametro}' debe ser un ObjectId válido.`;
  };

  #obtenerMensajeNumeroNoEnteroPositivo = (parametro) => {
    return `El parámetro '${parametro}' debe ser un string válido.`;
  };

  #validarParametros = (queryParameters) => {
    const errores = [];
    if (
      queryParameters.idCiudad &&
      !mongoose.Types.ObjectId.isValid(queryParameters.idCiudad)
    )
      errores.push(this.#obtenerMensajeIdInvalido("ciudad"));
    if (
      queryParameters.idPais &&
      !mongoose.Types.ObjectId.isValid(queryParameters.idCiudad)
    )
      errores.push(this.#obtenerMensajeIdInvalido("pais"));
    if (
      queryParameters.precioMinimo &&
      !this.#esNumeroPositivo(queryParameters.precioMinimo)
    )
      errores.push(this.#obtenerMensajeNumeroNoEnteroPositivo("precioMinimo"));
    if (
      queryParameters.precioMaximo &&
      !this.#esNumeroPositivo(queryParameters.precioMaximo)
    )
      errores.push(this.#obtenerMensajeNumeroNoEnteroPositivo("precioMaximo"));
    const precioMinimo = queryParameters.precioMinimo
      ? parseFloat(queryParameters.precioMinimo)
      : null;
    const precioMaximo = queryParameters.precioMaximo
      ? parseFloat(queryParameters.precioMaximo)
      : null;
    if (
      precioMinimo !== null &&
      precioMaximo !== null &&
      precioMinimo > queryParameters
    ) {
      errores.push(
        'El \'precioMinimo\' no puede ser mayor que el \'precioMaximo\'.'
      );
    }
    if (queryParameters.latitud && isNaN(queryParameters.latitud))
      errores.push(this.#obtenerMensajeStringInvalido("coordLatitud"));
    if (queryParameters.longitud && isNaN(queryParameters.longitud))
      errores.push(this.#obtenerMensajeStringInvalido("coordLongitud"));
    if (queryParameters.huespedes) {
      const huespedesNum = parseInt(queryParameters.huespedes);
      if (
        !this.#esNumeroPositivo(queryParameters.huespedes) ||
        !Number.isInteger(huespedesNum)
      ) {
        errores.push(this.#obtenerMensajeNumeroNoEnteroPositivo("huespedes"));
      }
    }
    if (
      queryParameters.caracteristicas &&
      !this.#esStringValido(queryParameters.caracteristicas)
    )
      errores.push(this.#obtenerMensajeStringInvalido("caracteristicas"));
    if (errores.length > 0) {
      throw new FiltrosAlojamientoInvalidosException(errores.join(" "));
    }
    return true;
  };

  #obtenerCriterioParseado = (queryParameters) => {
    return {
      idCiudad: queryParameters.idCiudad,
      idPais: queryParameters.idPais,
      latitud: queryParameters.latitud
        ? parseFloat(queryParameters.latitud)
        : undefined,
      longitud: queryParameters.longitud
        ? parseFloat(queryParameters.longitud)
        : undefined,
      precioMinimo: queryParameters.precioMinimo
        ? parseFloat(queryParameters.precioMinimo)
        : undefined,
      precioMaximo: queryParameters.precioMinimo
        ? parseFloat(queryParameters.precioMaximo)
        : undefined,
      huespedes: queryParameters.huespedes
        ? parseInt(queryParameters.huespedes)
        : undefined,
      caracteristicas: this.#mapearCaracteristicas(
        queryParameters.caracteristicas
      ),
    };
  };

  #toDireccionDto = (direccion) => {
    return {
      calle: direccion.calle,
      altura: direccion.altura,
      coordenadas: {
        latitud: direccion.latitud,
        longitud: direccion.longitud,
      },
      ciudad: {
        nombre: direccion.ciudad.nombre,
        pais: direccion.ciudad.pais.nombre,
      },
    };
  };

  #toDto = (alojamiento) => {
    return {
      nombre: alojamiento.nombre,
      descripcion: alojamiento.descripcion,
      direccion: alojamiento.direccion
        ? this.#toDireccionDto(alojamiento.direccion)
        : undefined,
      precioPorNoche: alojamiento.precioPorNoche,
      cantHuespedesMax: alojamiento.cantHuespedesMax,
      moneda: alojamiento.moneda.nombre,
      horarioCheckIn: alojamiento.horarioCheckIn,
      horarioCheckOut: alojamiento.horarioCheckOut,
      caracteristicas: alojamiento.caracteristicas,
    };
  };

  async buscarAlojamientosConFiltros(req, res, next) {
    try {
      this.#validarParametros(req.query);
      const criterios = this.#obtenerCriterioParseado(req.query);
      const pagina = req.query.pagina || 1;
      const tamanioPagina = req.query.tamanioPagina || 25;
      const alojamientos = await this.alojamientoRepository.findAllWithFilters(
        criterios,
        {
          pagina,
          tamanioPagina,
        }
      );
      const jsonRespuesta = alojamientos.map(this.#toDto);
      res.json(jsonRespuesta);
    } catch (error) {
      next(error);
    }
  }
}
