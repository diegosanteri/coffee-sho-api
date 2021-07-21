import { Schema, Types } from 'mongoose';
import { mongoosePagination } from "ts-mongoose-pagination";
import ProductSchema from '../../../products/repository/schema/product.schema';

const OrderItemSchema = new Schema({
  quantity: Number,
  item: ProductSchema,
});

OrderItemSchema.plugin(mongoosePagination);

export default OrderItemSchema;