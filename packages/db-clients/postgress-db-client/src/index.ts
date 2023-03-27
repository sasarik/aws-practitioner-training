import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import postgresConfig from './config/postgres.config';
import { PostgresService } from './services/postgres.service';
import { DB_CLIENT_SERVICE } from '@domains/db-client';

@Module({
  imports: [ConfigModule.forFeature(postgresConfig)],
  providers: [
    {
      useClass: PostgresService,
      provide: DB_CLIENT_SERVICE,
    },
  ],
  exports: [DB_CLIENT_SERVICE],
})
export class PostgresDbModule {}
