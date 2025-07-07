import {Booking} from "../../../../domain/entities/Booking";
import {DateRange} from "../../../../domain/values/DateRange";
import {BookingStatus} from "../../../../domain/enums/BookingStatus";

export const BookingMongoMapper = {
  toEntity(doc) {
    return new Booking(
      doc._id,
      doc.place,
      doc.guest,
      doc.totalGuests,
      doc.price,
      doc.createdAt, // Mongoose parses Date type
      new DateRange(doc.dateRange.startDate, doc.dateRange.endDate),
      BookingStatus.getByString(doc.status)
    );
  },
  toPersistence(entity) {
    if (!entity.place?.id) {
      throw new Error('Booking must have a valid place with id');
    }
    if (!entity.guest?.id) {
      throw new Error('Booking must have a valid guest with id');
    }
    return {
      _id: entity.id,
      place: entity.place?.id || entity.place,
      guest: entity.guest?.id || entity.guest,
      totalGuests: entity.totalGuests,
      price: entity.price,
      createdAt: entity.createdAt,
      dateRange: entity.dateRange,
      status: entity.status,
    }
  }
}