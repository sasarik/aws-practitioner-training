import { Module } from '@nestjs/common';
import { OrderRepository } from './order/order.repository';
import { CART_REPOSITORY, ORDER_REPOSITORY } from './interfaces';
import { PostgresDbModule } from '@db-client/postgress';
import { CartRepository } from './cart/cart.repository';

@Module({
  imports: [PostgresDbModule],
  providers: [
    {
      useClass: CartRepository,
      provide: CART_REPOSITORY,
    },
    {
      useClass: OrderRepository,
      provide: ORDER_REPOSITORY,
    },
  ],
  exports: [ORDER_REPOSITORY, CART_REPOSITORY],
})
export class RepositoryModule {}
