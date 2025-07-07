import mongoose from "mongoose";

import { Booking } from "../../../../domain/entities/Booking";
import { BookingStatus } from "../../../../domain/enums/BookingStatus";

import { DateRangeSchema } from "./DateRangeSchema";

const BookingSchema = new mongoose.Schema(
  {
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
    totalGuests: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateRange: {
      type: DateRangeSchema,
      required: true,
    },
    status: {
      type: String,
      enum: BookingStatus.getAllAsString(),
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "bookings",
  }
);

BookingSchema.loadClass(Booking);

export const BookingModel = mongoose.model("Booking", BookingSchema);
