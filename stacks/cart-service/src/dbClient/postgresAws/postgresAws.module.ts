import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DB_CLIENT_SERVICE } from '@domains/db-client';
import postgresAwsConfig from './config/postgresAws.config';
import { PostgresAWSService } from './services/postgresAWS.service';

@Module({
  imports: [ConfigModule.forFeature(postgresAwsConfig)],
  providers: [
    {
      useClass: PostgresAWSService,
      provide: DB_CLIENT_SERVICE,
    },
  ],
  exports: [DB_CLIENT_SERVICE],
})
export class PostgresAwsModule {}
