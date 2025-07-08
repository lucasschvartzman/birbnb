import mongoose from "mongoose";

import { Address } from "../../../../domain/values/Address";

export const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    ref: "City",
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

AddressSchema.loadClass(Address);
