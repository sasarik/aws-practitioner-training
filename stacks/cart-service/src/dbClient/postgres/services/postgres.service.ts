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

  async query<T>(queryString: string, ...paramsValues): Promise<IDbQueryResult<T>> {
    await this.connect();
    return await this.executeSqlStatement<T>(queryString, ...paramsValues);
  }

  async transactQuery<T>(queryStrings: string[]): Promise<IDbQueryResult<T>> {
    try {
      await this.connect();
      await this.executeSqlStatement('BEGIN');
      const result = await this.executeSqlStatement<T>(queryStrings.join(';\n'));
      await this.executeSqlStatement('COMMIT');
      return result;
    } catch (e) {
      await this.executeSqlStatement('ROLLBACK');
      throw e;
    }
  }

  private async executeSqlStatement<T>(sql: string, ...paramsValues): Promise<IDbQueryResult<T>> {
    const result = paramsValues.length > 0 ? await this.client.query(sql, paramsValues) : await this.client.query(sql);
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
}
