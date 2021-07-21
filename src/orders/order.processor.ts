import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { OrderGateway } from './order_gateway';
import { OrderDomain } from './domain/order.domain';
import { OrderService } from './order.service';

@Processor('orders')
export class OrderProcessor{

  constructor(
    private readonly orderService: OrderService,
    private readonly orderGateway: OrderGateway) {}

  @Process("order")
  async processOrder(job: Job<unknown>) {

    const orderId = job.data["orderId"];
    this.orderGateway.sendMessage(await this.getData(orderId));
    return {};
  }

  private async getData(orderId: string) : Promise<OrderDomain>{

    const order = await this.orderService.getOrderById(orderId);
    return order;
  }
}