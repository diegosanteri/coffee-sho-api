import { Document } from 'mongoose';

export interface ComboEntity extends Document {
  readonly _id: string;
  readonly name: string;
  readonly productIds: string[],
  readonly discountPercentage: number
}