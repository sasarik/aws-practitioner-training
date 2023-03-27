import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CartModule } from '@nest-shared/cart-module';
import { OrderModule } from '@nest-shared/order-module';

@Module({
  imports: [CartModule, OrderModule],
  controllers: [AppController],
})
export class AppModule {}
