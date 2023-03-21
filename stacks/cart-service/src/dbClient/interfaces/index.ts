export const DB_CLIENT_SERVICE = 'DatabaseClientService';

export interface IDbClientService {
  config(): Record<string, string | number>;

  connect(): Promise<void>;

  query<T>(queryString: string): Promise<IDbQueryResult<T>>;
}

export interface IDbQueryResult<T> {
  rows: T[];
  rowsCount: number;
  fields: { name: string }[];
}
