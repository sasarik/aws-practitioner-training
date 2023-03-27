import { dbClientsPostgressAwsDbClient } from './db-clients-postgress-aws-db-client';

describe('dbClientsPostgressAwsDbClient', () => {
  it('should work', () => {
    expect(dbClientsPostgressAwsDbClient()).toEqual('db-clients-postgress-aws-db-client');
  });
});
