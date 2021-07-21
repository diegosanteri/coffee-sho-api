import { Document, Types } from 'mongoose';

export interface ProductEntity extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly price: number;
  preparationTimeInMinutes: number
}