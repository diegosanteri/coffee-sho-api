import { ProductDomain } from "src/products/domain/product.domain";

export class OrderItemDomain {
    quantity: number;
    item: ProductDomain;
}