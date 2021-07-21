import { Injectable, PreconditionFailedException, NotFoundException } from "@nestjs/common";
import { OrderDomain } from "./domain/order.domain";
import OrderRepository from "./repository/order.repository";
import { CreateOrderDomain } from "./domain/create_order.domain";
import { OrderSchedule } from "./order_schedule.service";
import { SearchQuery } from "src/common/model/search_query";
import { PaginateQuery } from "src/common/paginate.query";
import { ComboService } from "src/combos/combos.service";
import { SimulateOrderDomain } from "./domain/simulate_order.domain";

@Injectable()
export class OrderService {

    constructor(
        private readonly orderSchedule: OrderSchedule,
        private readonly orderRepository: OrderRepository,
        private readonly comboService: ComboService
    ) {}

    async createOrder(createOrderDomain: CreateOrderDomain) : Promise<OrderDomain> {

        const ids = createOrderDomain.items.map(orderItem => orderItem.item._id);
        
        const combos = await this.comboService.findCombosByProducts([...new Set(ids)]);
        if(combos.length > 0) {
            let discountPercentage = combos[0].discountPercentage;

            createOrderDomain.discount = createOrderDomain.items.reduce((count, item) => {
                return count + (item.quantity * item.item.price)
            }, 0) * (discountPercentage / 100);
        }

        let order = await this.orderRepository.createOrder(createOrderDomain);
        if(order.isEmpty()) {
            throw new PreconditionFailedException("Some condition failed while trying to create a order");
        }

        await this.scheduleOrder(order.get());

        return order.get();
    }

    async simulateOrder(createOrderDomain: CreateOrderDomain) : Promise<OrderDomain> {

        const ids = createOrderDomain.items.map(orderItem => orderItem.item._id);
        const combos = await this.comboService.findCombosByProducts([...new Set(ids)]);

        const simulation = createOrderDomain as SimulateOrderDomain;

        simulation.total = simulation.items.reduce((count, item) => {
            return count + (item.quantity * item.item.price)
        }, 0);

        if(combos.length > 0) {
            let discountPercentage = combos[0].discountPercentage;
            simulation.discount = simulation.total * (discountPercentage / 100);
            simulation.total = simulation.total - simulation.discount;
        }

        return simulation;
    }

    async getOrderById(orderId: string) : Promise<OrderDomain> {

        let order = await this.orderRepository.getOrderById(orderId);
        if(order.isEmpty()) {
            throw new NotFoundException("Order not found");
        }

        return order.get();
    }

    async getOrders(search: SearchQuery, page: number, limit: number) : Promise<PaginateQuery<OrderDomain>> {

        let orders = await this.orderRepository.getOrders(search, page, limit);
        return orders;
    }

    private async scheduleOrder(order: OrderDomain) : Promise<void> {

        const totalTime = order.items.reduce((sum, item) => {
            return sum + (item.item.preparationTimeInMinutes * item.quantity)
        }, 0)

        await this.orderSchedule.schedule(order._id, totalTime);
        
        return;
    }
}