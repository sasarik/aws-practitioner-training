import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CartModule } from '@nest-shared/cart-module';
import { OrderModule } from '@nest-shared/order-module';
import { AuthModule } from '@nest-shared/auth-module';

@Module({
  imports: [AuthModule, CartModule, OrderModule],
  controllers: [AppController],
})
export class AppModule {}
