import * as dbClient from '@helpers/db-client';
import * as productsListHandler from './handler';

describe('products-list tests', () => {
  let mockConsole;
  beforeAll(() => {
    mockConsole = jest.spyOn(console, 'log').mockImplementation(() => {
      // This is intentional
    });
  });
  afterAll(() => {
    mockConsole.mockRestore();
  });

  it('should find product by id', async () => {
    const spyOn = jest.spyOn(dbClient, 'getAvailableProductItems').mockImplementation(() =>
      Promise.resolve([
        { id: '1', title: 'Test Product 1', count: 1, description: '11', price: 10 },
        { id: '2', title: 'Test Product 2', count: 2, description: '22', price: 22 },
      ])
    );
    const result = await productsListHandler.main({
      body: '',
      headers: undefined,
      httpMethod: '',
      isBase64Encoded: false,
      multiValueHeaders: undefined,
      multiValueQueryStringParameters: undefined,
      path: '',
      queryStringParameters: undefined,
      requestContext: undefined,
      resource: '',
      stageVariables: undefined,
      pathParameters: { productId: '42' },
    });
    const resultBody = JSON.parse(result.body);

    expect(result).toMatchObject({
      statusCode: 200,
      body: expect.any(String),
    });

    expect(resultBody).toMatchObject({
      message: expect.any(String),
      products: [
        { id: '1', title: 'Test Product 1', count: 1, description: '11', price: 10 },
        { id: '2', title: 'Test Product 2', count: 2, description: '22', price: 22 },
      ],
    });
    spyOn.mockRestore();
  });
});
