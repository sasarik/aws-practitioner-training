import { dbClientsPostgressDbClient } from './db-clients-postgress-db-client';

describe('dbClientsPostgressDbClient', () => {
  it('should work', () => {
    expect(dbClientsPostgressDbClient()).toEqual('db-clients-postgres-db-client');
  });
});
