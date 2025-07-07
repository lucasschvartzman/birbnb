import { INotificationRepository } from "../../../../domain/repositories/INotificationRepository";
import { NotificationModel } from "../schemas/NotificationSchema";
import { NotificationMongoMapper } from "../mappers/NotificationMongoMapper";

export class NotificationMongoRepository extends INotificationRepository {
  constructor() {
    super();
    this.model = NotificationModel;
  }

  async create(notification) {
    const persistenceNotification = NotificationMongoMapper.toPersistence(notification);
    const notificationDoc = new NotificationModel(persistenceNotification);
    const savedDoc = await notificationDoc.save();
    await this.#populateNotification(savedDoc);
    return NotificationMongoMapper.toEntity(savedDoc);
  }

  async update(notification) {
    const persistenceNotification = NotificationMongoMapper.toPersistence(notification);
    const savedDoc = await this.model
      .findOneAndReplace(
        { _id : persistenceNotification._id },
        persistenceNotification,
        { new : true }
      );
    if (!savedDoc) {
      return null;
    }
    await this.#populateNotification(savedDoc);
    return NotificationMongoMapper.toEntity(savedDoc);
  }

  async findById(id) {
    const savedDoc = await this.model.findById(id);
    if (!savedDoc) {
      return null;
    }
    await this.#populateNotification(savedDoc);
    return NotificationMongoMapper.toEntity(savedDoc);
  }

  async findAllByGuest(id) {
    const savedDocs = await this.model
      .find({ guest : id })
      .populate("guest");
    if (!savedDocs) {
      return [];
    }
    return savedDocs.map(doc => NotificationMongoMapper.toEntity(doc));
  }

  async #populateNotification(notificationDoc) {
    await notificationDoc.populate("guest");
  }
}
