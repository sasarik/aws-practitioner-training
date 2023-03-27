import { Module } from '@nestjs/common';
import { CART_REPOSITORY } from '@domains/nest-repository';
import { PostgresDbModule } from '@db-client/postgres';
import { CartRepositoryService } from './cart.repository.service';

@Module({
  imports: [PostgresDbModule],
  providers: [
    {
      useClass: CartRepositoryService,
      provide: CART_REPOSITORY,
    },
  ],
  exports: [CART_REPOSITORY],
})
export class CartRepositoryModule {}
