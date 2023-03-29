import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CartModule } from '@nest-shared/cart-module';
import { OrderModule } from '@nest-shared/order-module';
import { AuthModule } from '@nest-shared/auth-module';

@Module({
  imports: [CartModule, OrderModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
