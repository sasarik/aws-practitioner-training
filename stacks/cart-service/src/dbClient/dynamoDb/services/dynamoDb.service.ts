import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { IDbClientService, IDbQueryResult } from '../../interfaces';
import dynamoDbConfig from '../config/dynamoDb.config';

@Injectable()
export class DynamoDbService implements IDbClientService {
  constructor(
    @Inject(dynamoDbConfig.KEY)
    private dbConfig: ConfigType<typeof dynamoDbConfig>
  ) {}

  config() {
    return this.dbConfig;
  }

  async connect(): Promise<void> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async query<T>(_queryString: string): Promise<IDbQueryResult<T>> {
    return Promise.resolve(undefined);
  }
}
