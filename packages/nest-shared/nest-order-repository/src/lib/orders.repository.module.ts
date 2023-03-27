import { Module } from '@nestjs/common';
import { OrdersRepositoryService } from './orders.repository.service';
import { ORDER_REPOSITORY } from '@domains/nest-repository';
import { PostgresDbModule } from '@db-client/postgres';

@Module({
  imports: [PostgresDbModule],
  providers: [
    {
      useClass: OrdersRepositoryService,
      provide: ORDER_REPOSITORY,
    },
  ],
  exports: [ORDER_REPOSITORY],
})
export class OrdersRepositoryModule {}
