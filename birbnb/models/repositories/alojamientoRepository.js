import { AlojamientoModel } from "../schemas/alojamientoSchema.js";
import mongoose from "mongoose";

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

  findAllWithFilters = async (criterio, { pagina = 1, tamanioPagina = 10 }) => {
    const pipeline = [];

    pipeline.push(
      {
        $lookup: {
          from: "usuarios",
          localField: "anfitrion",
          foreignField: "_id",
          as: "anfitrion",
        },
      },
      { $unwind: "$anfitrion" },
      {
        $lookup: {
          from: "ciudades",
          localField: "direccion.ciudad",
          foreignField: "_id",
          as: "direccion.ciudad",
        },
      },
      { $unwind: "$direccion.ciudad" },
      {
        $lookup: {
          from: "paises",
          localField: "direccion.ciudad.pais",
          foreignField: "_id",
          as: "direccion.ciudad.pais",
        },
      },
      { $unwind: "$direccion.ciudad.pais" }
    );

    const match = {};

    if (criterio.idCiudad) {
      match["direccion.ciudad._id"] = new mongoose.Types.ObjectId(criterio.idCiudad);
    }

    if (criterio.idPais) {
      match["direccion.ciudad.pais._id"] = new mongoose.Types.ObjectId(criterio.idPais);
    }

    if (
      criterio.precioMinimo !== undefined ||
      criterio.precioMaximo !== undefined
    ) {
      match.precioPorNoche = {};
      if (criterio.precioMinimo !== undefined) {
        match.precioPorNoche.$gte = criterio.precioMinimo;
      }
      if (criterio.precioMaximo !== undefined) {
        match.precioPorNoche.$lte = criterio.precioMaximo;
      }
    }

    if (criterio.huespedes !== undefined) {
      match.cantHuespedesMax = { $gte: criterio.huespedes };
    }

    if (criterio.caracteristicas && criterio.caracteristicas.length > 0) {
      match.caracteristicas = { $all: criterio.caracteristicas };
    }

    if (criterio.latitud !== undefined && criterio.longitud !== undefined) {
      match["direccion.latitud"] = criterio.latitud;
      match["direccion.longitud"] = criterio.longitud;
    }

    if (Object.keys(match).length > 0) {
      pipeline.push({ $match: match });
    }

    pipeline.push({
      $facet: {
        datos: [
          { $skip: (pagina - 1) * tamanioPagina },
          { $limit: tamanioPagina }
        ],
        totalCount: [
          { $count: "count" }
        ]
      }
    });

    const resultado = await this.model.aggregate(pipeline);
    const datos = resultado[0].datos;
    const totalElementos = resultado[0].totalCount[0]?.count || 0;
    const totalPaginas = Math.ceil(totalElementos / tamanioPagina);

    return {
      datos,
      paginacion: {
        paginaActual: pagina,
        tamanioPagina: tamanioPagina,
        totalElementos,
        totalPaginas,
        hayPaginaAnterior: pagina > 1,
        hayPaginaSiguiente: pagina < totalPaginas
      }
    };
  };
}
