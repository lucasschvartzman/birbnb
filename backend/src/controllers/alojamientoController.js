import {AlojamientoValidator} from "../validators/AlojamientoValidator.js";
import {AlojamientoMapper} from "../models/mappers/AlojamientoMapper.js";
import {Caracteristica} from "../models/entities/Caracteristica.js";

export class AlojamientoController {

  constructor(alojamientoRepository, paisRepository, ciudadRepository) {
    this.alojamientoRepository = alojamientoRepository;
    this.paisRepository = paisRepository;
    this.ciudadRepository = ciudadRepository;
  }

  async buscarAlojamientosConFiltros(req, res, next) {
    try {
      AlojamientoValidator.validarQueryParameters(req.query);
      const filtrosBusqueda = AlojamientoMapper.obtenerFiltrosBusqueda(req.query);
      const pagina = parseInt(req.query.pagina) || 1;
      const tamanioPagina = parseInt(req.query.tamanioPagina) || 25;
      const resultadoBusqueda = await this.alojamientoRepository.findAllWithFilters(filtrosBusqueda, pagina, tamanioPagina);
      const respuestaJson = {
        alojamientos: resultadoBusqueda.alojamientos.map(r => AlojamientoMapper.toDto(r)),
        paginacion: resultadoBusqueda.paginacion
      };
      res.json(respuestaJson);
    } catch (error) {
      next(error);
    }
  }

  toPaisDto = (pais) => {
    return {
      id : pais._id,
      nombre: pais.nombre
    }
  }

  async obtenerPaises(req, res, next) {
    try {
      const paises = await this.paisRepository.findAll();
      res.json(paises.map(p => this.toPaisDto(p)));
    } catch (error) {
      next(error);
    }
  }

  toCiudadDto = (ciudad) => {
    return {
      id: ciudad._id,
      nombre: ciudad.nombre
    }
  }

  async obtenerCiudadesPais(req, res, next) {
    try {
      const ciudadesPais = await this.ciudadRepository.findAllByIdPais(req.query.id);
      res.json(ciudadesPais.map(c => this.toCiudadDto(c)));
    } catch (error) {
      next(error);
    }
  }

  async obtenerCaracteristicas(req, res, next) {
    res.json(Caracteristica.getAllAsString())
  }
}
