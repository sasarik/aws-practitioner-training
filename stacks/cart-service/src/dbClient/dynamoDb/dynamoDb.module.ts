import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dynamoDbConfig from './config/dynamoDb.config';
import { DynamoDbService } from './services/dynamoDb.service';
import { DB_CLIENT_SERVICE } from '@domains/db-client';

@Module({
  imports: [ConfigModule.forFeature(dynamoDbConfig)],
  providers: [
    {
      // You can switch useClass to different implementation
      useClass: DynamoDbService,
      provide: DB_CLIENT_SERVICE,
    },
  ],
  exports: [DB_CLIENT_SERVICE],
})
export class DynamoDbClientModule {}
