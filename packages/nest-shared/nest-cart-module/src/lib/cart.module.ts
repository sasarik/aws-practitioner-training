import { Module } from '@nestjs/common';
import { OrderModule } from '@nest-shared/order-module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { OrdersRepositoryModule } from '@nest-shared/order-repository';
import { CartRepositoryModule } from '@nest-shared/cart-repository';

@Module({
  imports: [OrderModule, OrdersRepositoryModule, CartRepositoryModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
