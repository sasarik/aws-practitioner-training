import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { CartController } from './cart.controller';
import { CartService } from './services';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [OrderModule, RepositoryModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
