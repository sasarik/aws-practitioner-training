import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrdersRepositoryModule } from '@nest-shared/order-repository';

@Module({
  imports: [OrdersRepositoryModule],
  providers: [OrderService],
  exports: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
