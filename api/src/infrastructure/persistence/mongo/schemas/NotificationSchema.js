import mongoose from "mongoose";

import { Notification } from "../../../../domain/entities/Notification";

const NotificationSchema = new mongoose.Schema(
  {
    guest: {
      type: String,
      ref: "Guest",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    read: {
      type: Boolean,
      required: true,
    },
    readAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "notifications",
  }
);

NotificationSchema.loadClass(Notification);

export const NotificationModel = mongoose.model("Notification", NotificationSchema);
