import mongoose from "mongoose";

import { Guest } from "../../../../domain/entities/Guest";

const GuestSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "guests",
  }
);

GuestSchema.loadClass(Guest);

export const GuestModel = mongoose.model("Guest", GuestSchema);
