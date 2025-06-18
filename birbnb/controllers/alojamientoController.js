import {AlojamientoValidator} from "../validators/AlojamientoValidator.js";
import {AlojamientoMapper} from "../models/mappers/AlojamientoMapper.js";

export class AlojamientoController {

  constructor(alojamientoRepository) {
    this.alojamientoRepository = alojamientoRepository;
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
        resultadoPaginacion: resultadoBusqueda.resultadoPaginacion
      };
      res.json(respuestaJson);
    } catch (error) {
      next(error);
    }
  }
}
