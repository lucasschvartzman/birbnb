import {AlojamientoModel} from "../schemas/alojamientoSchema.js";
import {AlojamientoPipelineBuilder} from "../builders/AlojamientoPipelineBuilder.js";

export class AlojamientoRepository {
  constructor() {
    this.model = AlojamientoModel;
  }

  findById(id) {
    return this.model
      .findById(id)
      .populate({
        path: "direccion.ciudad",
        populate: {
          path: "pais",
        },
      })
      .populate("anfitrion")
      .populate("reservas");
  }

  async findAllWithFilters(filtros = {}, pagina, tamanioPagina) {
    const pipeline = AlojamientoPipelineBuilder
      .create()
      .agregarJoins()
      .agregarFiltros(filtros)
      .agregarPaginacion(pagina, tamanioPagina)
      .build();

    const resultadoAgregacion = await this.#realizarAgregacion(pipeline);

    const alojamientos = resultadoAgregacion.datos;
    const resultadoPaginacion = this.#obtenerResultadoPaginacion(resultadoAgregacion, pagina, tamanioPagina);

    return {
      alojamientos,
      resultadoPaginacion
    }
  }

  async #realizarAgregacion(pipeline) {
    const resultadoAgregacion = await this.model.aggregate(pipeline);
     // Sé que es feo, pero aggregate siempre devuelve un array por el $facet :s
    return resultadoAgregacion[0] || { datos: [], totalCount: [] };
  }

  #obtenerResultadoPaginacion(resultadoBusqueda, pagina, tamanioPagina) {
    const totalElementos = resultadoBusqueda?.totalCount?.[0]?.count || 0;
    const totalPaginas = Math.ceil(totalElementos / tamanioPagina);
    return {
      paginacion: {
        paginaActual: pagina,
        tamanioPagina: tamanioPagina,
        totalElementos,
        totalPaginas,
        hayPaginaAnterior: pagina > 1,
        hayPaginaSiguiente: pagina < totalPaginas
      }
    }
  }

}
