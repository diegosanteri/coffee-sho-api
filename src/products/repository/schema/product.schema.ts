import { Schema, Types } from 'mongoose';
import { mongoosePagination } from "ts-mongoose-pagination";

const ProductSchema = new Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  preparationTimeInMinutes: Number
});

ProductSchema.plugin(mongoosePagination);

export default ProductSchema;