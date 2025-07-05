import mongoose from "mongoose";

export class AlojamientoPipelineBuilder {
  constructor() {
    this.pipeline = [];
  }

  static create() {
    return new AlojamientoPipelineBuilder();
  }

  agregarJoins() {
    this.pipeline.push(
      {
        $lookup: {
          from: "usuarios",
          localField: "anfitrion",
          foreignField: "_id",
          as: "anfitrion",
        },
      },
      {$unwind: "$anfitrion"},
      {
        $lookup: {
          from: "ciudades",
          localField: "direccion.ciudad",
          foreignField: "_id",
          as: "direccion.ciudad",
        },
      },
      {$unwind: "$direccion.ciudad"},
      {
        $lookup: {
          from: "paises",
          localField: "direccion.ciudad.pais",
          foreignField: "_id",
          as: "direccion.ciudad.pais",
        },
      },
      {$unwind: "$direccion.ciudad.pais"}
    );
    return this;
  }

  agregarFiltros(filtrosBusqueda) {
    const match = this.#construirMatch(filtrosBusqueda);
    if (Object.keys(match).length > 0) {
      this.pipeline.push({$match: match});
    }
    return this;
  }

  agregarPaginacion(pagina, tamanioPagina) {
    this.pipeline.push({
      $facet: {
        datos: [
          {$skip: (pagina - 1) * tamanioPagina},
          {$limit: tamanioPagina}
        ],
        totalCount: [
          {$count: "count"}
        ]
      }
    });
    return this;
  }

  build() {
    return this.pipeline;
  }

  #construirMatch(filtrosBusqueda) {
    const match = {};

    if (filtrosBusqueda.idCiudad) {
      match["direccion.ciudad._id"] = new mongoose.Types.ObjectId(filtrosBusqueda.idCiudad);
    }

    if (filtrosBusqueda.idPais) {
      match["direccion.ciudad.pais._id"] = new mongoose.Types.ObjectId(filtrosBusqueda.idPais);
    }

    this.#agregarFiltroPrecio(match, filtrosBusqueda);
    this.#agregarFiltroHuespedes(match, filtrosBusqueda);
    this.#agregarFiltroCaracteristicas(match, filtrosBusqueda);
    this.#agregarFiltroCoordenadas(match, filtrosBusqueda);

    return match;
  }

  #agregarFiltroPrecio(match, filtrosBusqueda) {
    if (filtrosBusqueda.precioMinimo !== undefined || filtrosBusqueda.precioMaximo !== undefined) {
      match.precioPorNoche = {};
      if (filtrosBusqueda.precioMinimo !== undefined) {
        match.precioPorNoche.$gte = filtrosBusqueda.precioMinimo;
      }
      if (filtrosBusqueda.precioMaximo !== undefined) {
        match.precioPorNoche.$lte = filtrosBusqueda.precioMaximo;
      }
    }
  }

  #agregarFiltroHuespedes(match, filtrosBusqueda) {
    if (filtrosBusqueda.huespedes !== undefined) {
      match.cantHuespedesMax = {$gte: filtrosBusqueda.huespedes};
    }
  }

  #agregarFiltroCaracteristicas(match, filtrosBusqueda) {
    if (filtrosBusqueda.caracteristicas && filtrosBusqueda.caracteristicas.length > 0) {
      match.caracteristicas = {$all: filtrosBusqueda.caracteristicas};
    }
  }

  #agregarFiltroCoordenadas(match, filtrosBusqueda) {
    if (filtrosBusqueda.latitud !== undefined ) {
      match["direccion.latitud"] = filtrosBusqueda.latitud;
    }
    if (filtrosBusqueda.longitud !== undefined) {
      match["direccion.longitud"] = filtrosBusqueda.longitud;
    }
  }
}