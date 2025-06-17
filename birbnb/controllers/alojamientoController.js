import { Caracteristica } from "../models/entities/Caracteristica.js";
import { FiltrosAlojamientoInvalidosException } from "../exceptions/alojamientoExceptions.js";

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
    return `El parámetro "${parametro}" debe ser un string válido`;
  };

  #obtenerMensajeNumeroNoEnteroPositivo = (parametro) => {
    return `El parámetro "${parametro}" debe ser un string válido`;
  };

  #validarParametros = (queryParameters) => {
    const errores = [];
    if (
      queryParameters.idCiudad &&
      !this.#esStringValido(queryParameters.idCiudad)
    )
      errores.push(this.#obtenerMensajeStringInvalido("ciudad"));
    if (queryParameters.idPais && !this.#esStringValido(queryParameters.idPais))
      errores.push(this.#obtenerMensajeStringInvalido("pais"));
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
    if (
      !isNaN(queryParameters.precioMinimo) &&
      !isNaN(queryParameters.precioMaximo) &&
      queryParameters.precioMinimo > queryParameters.precioMaximo
    )
      errores.push(
        'El "precioMinimo" no puede ser mayor que el "precioMaximo"'
      );
    if (queryParameters.latitud && isNaN(queryParameters.latitud))
      errores.push(this.#obtenerMensajeStringInvalido("coordLatitud"));
    if (queryParameters.longitud && isNaN(queryParameters.latitud))
      errores.push(this.#obtenerMensajeStringInvalido("coordLongitud"));
    if (
      queryParameters.huespedes &&
      !this.#esNumeroPositivo(
        queryParameters.huespedes ||
          !Number.isInteger(queryParameters.huespedes)
      )
    )
      errores.push(this.#obtenerMensajeNumeroNoEnteroPositivo("huespedes"));
    if (
      queryParameters.caracteristicas &&
      !this.#esStringValido(queryParameters.caracteristicas)
    )
      errores.push(this.#obtenerMensajeStringInvalido("caracteristicas"));
    if (errores.length > 0) {
      throw new FiltrosAlojamientoInvalidosException(JSON.stringify(errores));
    }
    return true;
  };

  #obtenerCriterioParseado = (queryParameters) => {
    return {
      idCiudad: queryParameters.idCiudad,
      idPais: queryParameters.idPais,
      latitud: queryParameters.latitud,
      longitud: queryParameters.longitud,
      precioMinimo: queryParameters.precioMinimo,
      precioMaximo: queryParameters.precioMaximo,
      huespedes: queryParameters.huespedes,
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
      direccion: this.#toDireccionDto(alojamiento.direccion),
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
      const alojamientos = await this.alojamientoRepository.findAll(criterios, {
        pagina,
        tamanioPagina,
      });
      const jsonRespuesta = alojamientos.map(this.#toDto);
      res.json(jsonRespuesta);
    } catch (error) {
      next();
    }
  }
}
