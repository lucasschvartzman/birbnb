import { AlojamientoModel } from "../schemas/alojamientoSchema.js";
import mongoose from "mongoose";

export class AlojamientoRepository {
  constructor() {
    this.model = AlojamientoModel;
  }

  async findById(id) {
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

  async findAll(filters = {}, paginado = {}) {
    const pipeline = [];

    this.addLocationLookups(pipeline);

    this.addLocationFilters(pipeline, filters);

    this.generarQuery(pipeline, filters);

    const skip = ((paginado.pagina || 1) - 1) * (paginado.tamanioPagina || 10);
    const limit = paginado.tamanioPagina || 10;
    pipeline.push({ $skip: skip }, { $limit: limit });

    this.addRelationshipLookups(pipeline);

    return await this.model.aggregate(pipeline);
  }

  addLocationLookups(pipeline) {
    pipeline.push(
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
          as: "ciudad.pais",
        },
      },
      { $unwind: "$ciudad.pais" }
    );
  }

  addLocationFilters(pipeline, filters) {
    const locationMatch = {};

    if (filters.idCiudad) {
      locationMatch["direccion.ciudad"] = new mongoose.Types.ObjectId(
        filters.idCiudad
      );
    }

    if (filters.idPais) {
      locationMatch["ciudad.pais._id"] = new mongoose.Types.ObjectId(
        filters.idPais
      );
    }

    if (Object.keys(locationMatch).length > 0) {
      pipeline.push({ $match: locationMatch });
    }
  }

  generarQuery(pipeline, filters) {
    const matchStage = {};

    if (filters.latitud !== undefined) {
      matchStage["direccion.latitud"] = filters.latitud;
    }
    if (filters.longitud !== undefined) {
      matchStage["direccion.longitud"] = filters.longitud;
    }

    if (
      filters.precioMinimo !== undefined ||
      filters.precioMaximo !== undefined
    ) {
      matchStage.precioPorNoche = {};
      if (filters.precioMinimo !== undefined) {
        matchStage.precioPorNoche.$gte = Number(filters.precioMinimo);
      }
      if (filters.precioMaximo !== undefined) {
        matchStage.precioPorNoche.$lte = Number(filters.precioMaximo);
      }
    }

    if (filters.huespedes !== undefined) {
      matchStage.cantHuespedesMax = { $gte: Number(filters.huespedes) };
    }

    if (filters.caracteristicas && Array.isArray(filters.caracteristicas)) {
      matchStage.caracteristicas = { $in: filters.caracteristicas };
    }

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }
  }

  addRelationshipLookups(pipeline) {
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
          from: "reservas",
          localField: "reservas",
          foreignField: "_id",
          as: "reservas",
        },
      }
    );
  }
}
