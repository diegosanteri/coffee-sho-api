import { Document } from 'mongoose';
import { ProductEntity } from 'src/products/repository/entity/product.entity';

export class OrderItemEntity extends Document {
    quantity: number;
    item: ProductEntity;
}