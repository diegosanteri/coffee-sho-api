import { OrderItemDomain } from "./order_item.domain";

export class SimulateOrderDomain {
    _id: string
    code: number;
    items: Array<OrderItemDomain>;
    discount: number;
    total: number;
}