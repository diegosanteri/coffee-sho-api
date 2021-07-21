import { Schema, Types } from 'mongoose';
import { mongoosePagination } from "ts-mongoose-pagination";
import OrderItemSchema from './order_item.schema';

import * as rn from 'random-number';


const OrderSchema = new Schema({
  code: { 
    type: Number,
    default: function () {
      return rn({min: 0, max: 9999, integer: true})
    }
  },
  items: [OrderItemSchema],
  discount: Number
});

OrderSchema.plugin(mongoosePagination);

export default OrderSchema;