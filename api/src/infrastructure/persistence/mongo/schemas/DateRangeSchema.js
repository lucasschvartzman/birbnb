import mongoose from "mongoose";

import { DateRange } from "../../../../domain/values/DateRange";

export const DateRangeSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

DateRangeSchema.loadClass(DateRange);
