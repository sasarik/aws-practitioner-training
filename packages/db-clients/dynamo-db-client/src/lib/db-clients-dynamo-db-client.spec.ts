import { dbClientsDynamoDbClient } from './db-clients-dynamo-db-client';

describe('dbClientsDynamoDbClient', () => {
  it('should work', () => {
    expect(dbClientsDynamoDbClient()).toEqual('db-clients-dynamo-db-client');
  });
});
