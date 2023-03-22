import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { PostgresDbModule } from '../dbClient/postgres/postgresDb.module';

@Module({
  imports: [PostgresDbModule],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
