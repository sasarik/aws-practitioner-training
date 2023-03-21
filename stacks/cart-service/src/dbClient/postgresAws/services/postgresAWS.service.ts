import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { IDbClientService, IDbQueryResult } from '../../interfaces';
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
      this.client = new RDSDataClient({ region: 'eu-west-1' });
      this.logger.log('pgDbClient::connected');
    }
  }

  async query<T>(queryString: string): Promise<IDbQueryResult<T>> {
    await this.connect();
    const res = await this.client.send(
      new ExecuteStatementCommand({
        sql: queryString,
        resourceArn: 'arn:aws:rds:eu-west-1:064582090880:db:aws-training-db-instance',
        database: this.dbConfig.database,
        secretArn: 'todo',
      })
    );
    this.logger.log(res, 'query');
    return undefined; // TODO impl
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transactQuery<T>(_queryStrings: string[]): Promise<IDbQueryResult<T>> {
    // this.logger.log(res, 'transactQuery');
    return undefined; // TODO impl
  }
}
