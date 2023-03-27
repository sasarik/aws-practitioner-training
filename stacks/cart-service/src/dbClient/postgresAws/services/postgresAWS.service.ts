import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { IDbClientService, IDbQueryResult } from '@domains/db-client';
import { ExecuteStatementCommand, RDSDataClient } from '@aws-sdk/client-rds-data';
import postgresAwsConfig from '../config/postgresAws.config';

@Injectable()
export class PostgresAWSService implements IDbClientService {
  private client: RDSDataClient;

  private readonly logger = new ConsoleLogger(this.constructor.name);

  constructor(
    @Inject(postgresAwsConfig.KEY)
    private dbConfig: ConfigType<typeof postgresAwsConfig>
  ) {}

  config() {
    return this.dbConfig;
  }

  async connect() {
    if (!this.client) {
      this.client = new RDSDataClient({ region: this.dbConfig.region });
      this.logger.log('RDSDataClient::Created');
    }
  }

  async query<T>(queryString: string): Promise<IDbQueryResult<T>> {
    await this.connect();
    const res = await this.client.send(
      new ExecuteStatementCommand({
        sql: queryString,
        resourceArn: this.dbConfig.arn,
        database: this.dbConfig.database,
        secretArn: 'tododo',
      })
    );
    this.logger.log(res, queryString);
    return undefined; // TODO impl
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transactQuery<T>(_queryStrings: string[]): Promise<IDbQueryResult<T>> {
    // this.logger.log(res, 'transactQuery');
    return undefined; // TODO impl
  }
}
