import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import postgresConfig from '../config/postgres.config';
import { ConfigType } from '@nestjs/config';
import { IDbClientService, IDbQueryResult } from '../../interfaces';

import { Client } from 'pg';

@Injectable()
export class PostgresService implements IDbClientService {
  private client: Client;

  private readonly logger = new ConsoleLogger(this.constructor.name);

  constructor(
    @Inject(postgresConfig.KEY)
    private dbConfig: ConfigType<typeof postgresConfig>
  ) {}

  config() {
    return this.dbConfig;
  }

  async connect() {
    if (!this.client) {
      this.client = new Client({ ...this.dbConfig, connectionTimeoutMillis: 30000 });
      this.logger.log('pgDbClient::connecting...');
      await this.client.connect();
      this.logger.log('pgDbClient::connected');
    }
  }

  async query<T>(queryString: string): Promise<IDbQueryResult<T>> {
    await this.connect();
    const result = await this.client.query(queryString);
    if (Array.isArray(result)) {
      const lastResult = result.pop();
      return {
        rows: lastResult.rows,
        rowsCount: lastResult.rows?.length ?? 0,
        fields: lastResult.fields ?? [],
      };
    }
    return {
      rows: result.rows,
      rowsCount: result.rows?.length ?? 0,
      fields: result.fields ?? [],
    };
  }

  async transactQuery<T>(queryStrings: string[]): Promise<IDbQueryResult<T>> {
    try {
      await this.connect();
      await this.client.query('BEGIN');
      const result = await this.query<T>(queryStrings.join(';\n'));
      await this.client.query('COMMIT');
      return result;
    } catch (e) {
      await this.client.query('ROLLBACK');
      throw e;
    }
  }
}
