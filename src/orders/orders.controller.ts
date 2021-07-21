import { Controller, Get, Post, Put, Delete, Param, Query, DefaultValuePipe, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { OrderDomain } from './domain/order.domain';
import { SearchQuery } from 'src/common/model/search_query';
import { OrderService } from './order.service';
import { CreateOrderDomain } from './domain/create_order.domain';
import { ParseSearchPipe } from '../common/pipe/parse_search.pipe';
import { PaginateQuery } from 'src/common/paginate.query';


@Controller('orders')
export class OrdersController {

    constructor(
        private readonly orderService: OrderService) {}

    @Post("")
    async createOrder(@Body() createOrderDomain: CreateOrderDomain) : Promise<OrderDomain> {
        return this.orderService.createOrder(createOrderDomain);
    }

    @Post("/simulate")
    async simulateOrder(@Body() createOrderDomain: CreateOrderDomain) : Promise<OrderDomain> {
        return this.orderService.simulateOrder(createOrderDomain);
    }

    @Get("")
    async getOrders(
        @Query("_search", new ParseSearchPipe()) search: SearchQuery, 
        @Query("_page", new DefaultValuePipe(1)) page: number, 
        @Query("_limit", new DefaultValuePipe(10)) limit: number): Promise<PaginateQuery<OrderDomain>> {
      return await this.orderService.getOrders(search, page, limit);
    }
}
