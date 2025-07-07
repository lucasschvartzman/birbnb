import { IBookingRepository } from "../../../../domain/repositories/IBookingRepository";
import { BookingModel } from "../schemas/BookingSchema";
import { BookingMongoMapper } from "../mappers/BookingMongoMapper";

export class BookingMongoRepository extends IBookingRepository {
  constructor() {
    super();
    this.model = BookingModel;
  }

  async create(booking) {
    const persistenceBooking = BookingMongoMapper.toPersistence(booking);
    const bookingDoc = new BookingModel(persistenceBooking);
    const savedDoc = await bookingDoc.save();
    await this.#populateBooking(savedDoc);
    return BookingMongoMapper.toEntity(savedDoc);
  }

  async update(booking) {
    const persistenceBooking = BookingMongoMapper.toPersistence(booking);
    const savedDoc = await this.model
      .findOneAndReplace(
        { _id : persistenceBooking._id },
        persistenceBooking,
        { new : true }
      );
    if (!savedDoc) {
      return null;
    }
    await this.#populateBooking(savedDoc);
    return BookingMongoMapper.toEntity(savedDoc);
  }

  async findById(id) {
    const savedDoc = await this.model.findById(id);
    if (!savedDoc) {
      return null;
    }
    await this.#populateBooking(savedDoc);
    return BookingMongoMapper.toEntity(savedDoc);
  }

  async findAllByGuest(id) {
    const savedDocs = await this.model
      .find({ guest : id })
      .populate("place")
      .populate("guest");
    if (!savedDocs) {
      return [];
    }
    return savedDocs.map(doc => BookingMongoMapper.toEntity(doc));
  }

  async #populateBooking(bookingDoc) {
    await bookingDoc.populate("place");
    await bookingDoc.populate("guest");
  }
}
