import { OrderItemDomain } from "./order_item.domain";

export class OrderDomain {
    _id: string
    code: number;
    items: Array<OrderItemDomain>;
    discount: number;
}