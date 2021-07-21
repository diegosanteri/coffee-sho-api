import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import {ConfigModule} from './config/config.module';
import { OrdersModule } from './orders/orders.module';
import { ComboModule } from './combos/combos.module';

@Module({
  imports: [ProductModule, ConfigModule.foorRoot(), OrdersModule, ComboModule],
})
export default class AppModule {}