import mongoose from "mongoose";

import { City } from "../../../../domain/values/City";

const CitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "cities",
  }
);

CitySchema.loadClass(City);

export const CityModel = mongoose.model("City", CitySchema);