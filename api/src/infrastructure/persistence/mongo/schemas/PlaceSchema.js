import mongoose from "mongoose";

import { Place } from "../../../../domain/entities/Place";
import { Feature } from "../../../../domain/enums/Feature";
import { AddressSchema } from "./AddressSchema";

const PlaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
      required: true,
    },
    address: {
      type: AddressSchema,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      enum: Feature.getAllAsString(),
    },
    bookings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    photos: {
      type: [String],
    },
  },
  {
    timestamps: true,
    collection: "places",
  }
);
