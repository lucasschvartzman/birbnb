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
          as: "ciudad",
        },
      },
      { $unwind: "$ciudad" },
      {
        $lookup: {
          from: "paises",
          localField: "ciudad.pais",
          foreignField: "_id",
          as: "pais",
        },
      },
      { $unwind: "$pais" }
    );

    const match = {};

    if (criterio.idCiudad) {
      match["ciudad._id"] = new mongoose.Types.ObjectId(criterio.idCiudad);
    }

    if (criterio.idPais) {
      match["pais._id"] = new mongoose.Types.ObjectId(criterio.idPais);
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

    pipeline.push(
      { $skip: (pagina - 1) * tamanioPagina },
      { $limit: tamanioPagina }
    );

    return await this.model.aggregate(pipeline);
  };
}
