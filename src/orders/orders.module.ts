import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import OrderSchema from './repository/schema/order.schema';
import { OrderService } from './order.service';
import OrderRepository from './repository/order.repository';
import { OrderSchedule } from './order_schedule.service';
import { OrderProcessor } from './order.processor';
import { ConfigModule } from 'src/config/config.module';
import { OrderGateway } from './order_gateway';
import { ComboModule } from 'src/combos/combos.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    BullModule.registerQueue({
      name: 'orders',
    }),
    ConfigModule,
    ComboModule
  ],
  controllers: [OrdersController],
  providers: [OrderService, OrderRepository, OrderSchedule, OrderProcessor, OrderGateway]
})
export class OrdersModule {}
