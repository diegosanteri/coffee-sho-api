import { Document } from 'mongoose';
import { OrderItemEntity } from './order_item.entity';

export interface OrderEntity extends Document {
  readonly _id: string;
  readonly code: number;
  readonly items: Array<OrderItemEntity>;
  readonly discount: number
}