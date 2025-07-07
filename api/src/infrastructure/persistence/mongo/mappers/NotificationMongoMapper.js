import {Notification} from "../../../../domain/entities/Notification";

export const NotificationMongoMapper = {
  toEntity(doc) {
    return new Notification(
      doc._id,
      doc.guest,
      doc.message,
      doc.createdAt, // Mongoose parses Date type
      doc.read,
      doc.readAt
    );
  },
  toPersistence(entity) {
    if (!entity.guest?.id) {
      throw new Error('Notification must have a valid guest with id');
    }
    return {
      _id: entity.id,
      guest: entity.guest?.id,
      message: entity.message,
      createdAt: entity.createdAt,
      read: entity.read,
      readAt: entity.readAt,
    }
  }
}