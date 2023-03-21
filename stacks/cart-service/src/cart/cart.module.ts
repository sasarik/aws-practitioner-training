import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { CartController } from './cart.controller';
import { CartService } from './services';
import { PostgresDbModule } from '../dbClient/postgres/postgresDb.module';

@Module({
  imports: [OrderModule, PostgresDbModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
