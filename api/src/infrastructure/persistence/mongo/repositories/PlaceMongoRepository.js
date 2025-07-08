import { IPlaceRepository } from "../../../../domain/repositories/IPlaceRepository";
import {PlaceMongoMapper} from "../mappers/PlaceMongoMapper";
import {PlaceModel} from "../schemas/PlaceSchema";
import {PaginationOptionsDTO} from "../../../../application/dtos/PaginationOptionsDTO";
import {PaginationResultDTO} from "../../../../application/dtos/PaginationResultDTO";
import {PlaceFiltersDTO} from "../../../../application/dtos/PlaceFiltersDTO";

export class PlaceMongoRepository extends IPlaceRepository {
  constructor() {
    super();
    this.model = PlaceModel;
  }

  async create(place) {
    const persistencePlace = PlaceMongoMapper.toPersistence(place);
    const placeDoc = new PlaceModel(persistencePlace);
    const savedDoc = await placeDoc.save();
    await this.#populatePlace(savedDoc);
    return PlaceMongoMapper.toEntity(savedDoc);
  }

  async findById(id) {
    const savedDoc = await this.model.findById(id);
    if (!savedDoc) {
      return null;
    }
    await this.#populatePlace(savedDoc);
    return PlaceMongoMapper.toEntity(savedDoc);
  }

  async findAll(filters = new PlaceFiltersDTO(), paginationOptions = new PaginationOptionsDTO()) {
    const query = this.#buildQuery(filters);
    const { skip, limit } = this.#buildPagination(paginationOptions);
    const savedDocs = await this.model
      .find(query)
      .skip(skip)
      .limit(limit)
      .populate("bookings");
    const totalDocs = await this.model.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);
    return {
      places: savedDocs.map(d => PlaceMongoMapper.toEntity(d)),
      pagination: new PaginationResultDTO(
        paginationOptions.pageNumber,
        paginationOptions.pageSize,
        totalPages,
        paginationOptions.pageNumber < totalPages,
        paginationOptions.pageNumber > 1
      )
    }
  }

  async #populatePlace(placeDoc) {
    await placeDoc.populate("bookings");
  }

  #buildQuery(filters) {
    const query = {};
    if (filters.city) {
      query['address.city._id'] = filters.city;
    }
    if (filters.country) {
      query['address.city.country._id'] = filters.country;
    }
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) {
        query.price.$gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        query.price.$lte = filters.maxPrice;
      }
    }
    if (filters.minCapacity !== undefined) {
      query.capacity = { $gte: filters.minCapacity };
    }
    if (filters.features && filters.features.length > 0) {
      query.features = { $all: filters.features };
    }
    return query;
  }

  #buildPagination(paginationOptions) {
    const pageSize = paginationOptions.pageSize;
    const pageNumber = paginationOptions.pageNumber ;
    const skip = (pageNumber - 1) * pageSize;
    const limit = pageSize;
    return { skip, limit };
  }
}
