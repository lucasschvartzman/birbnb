import {Place} from "../../../../domain/entities/Place";
import {Feature} from "../../../../domain/enums/Feature";

export const PlaceMongoMapper = {
  toEntity(doc) {
    return new Place(
      doc._id,
      doc.name,
      doc.description,
      doc.price,
      doc.address,
      doc.capacity,
      doc.features.map(f => Feature.getByString(f)),
      doc.bookings,
      doc.photos
    );
  },
  toPersistence(entity) {
    return {
      _id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      address: entity.address,
      capacity: entity.capacity,
      features: entity.features.map(f => f.value),
      bookings: entity.bookings.map(b => b.id),
      photos: entity.photos,
    }
  }
}