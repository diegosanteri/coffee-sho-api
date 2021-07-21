import { Schema, Types } from 'mongoose';
import { mongoosePagination } from "ts-mongoose-pagination";

const ComboSchema = new Schema({
  name: String,
  productIds: [String],
  discountPercentage: Number
});

ComboSchema.plugin(mongoosePagination);

export default ComboSchema;