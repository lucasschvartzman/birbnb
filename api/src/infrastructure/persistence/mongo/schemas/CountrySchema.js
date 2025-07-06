import mongoose from "mongoose";

import { Country } from "../../../../domain/values/Country";

const CountrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    collection: "countries",
  }
);

CountrySchema.loadClass(Country);

export const CountryModel = mongoose.model("Country", CountrySchema);
