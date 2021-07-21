import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";
import { OrderEntity } from "./entity/order.entity";
import { OrderDomain } from "../domain/order.domain";
import { CreateOrderDomain } from "../domain/create_order.domain";

import OrderMapper from "../order.mapper";
import { Optional } from "typescript-optional";
import { PaginateQuery } from "src/common/paginate.query";
import { SearchQuery } from "src/common/model/search_query";

@Injectable()
export default class OrderRepository {

    constructor(
        @InjectModel('Order') private readonly orderModel: PaginateModel<OrderEntity>,
    ) {}
    
    async createOrder(order: CreateOrderDomain) : Promise<Optional<OrderDomain>> {

        let orderCreated = new this.orderModel(order);
        orderCreated = await orderCreated.save();
        return OrderMapper.toDomain(orderCreated);
    }

    async getOrderById(orderId: string) : Promise<Optional<OrderDomain>> {

        let order = await this.orderModel.findById(orderId);
        return OrderMapper.toDomain(order);
    }

    async getOrders(search: SearchQuery, page: number, limit: number) : Promise<PaginateQuery<OrderDomain>> {

        let response = new PaginateQuery<OrderDomain>();

        let orders = await this.orderModel.paginate(search.filter, {page, perPage: limit});

        response.limit = limit;
        response.page = orders.pagination.page;
        response.docs =  OrderMapper.toDomains(orders.data);

        return response;
    }
}