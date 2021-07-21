import { OrderItemDomain } from "./order_item.domain";

export class CreateOrderDomain {
    items: Array<OrderItemDomain>;
    discount: number
}