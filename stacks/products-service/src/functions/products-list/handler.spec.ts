import * as productsListHandler from './handler';

describe('products-list tests', () => {
  it('should find product by id', async () => {
    const spyOn = jest.spyOn(productsListHandler, 'getAvailableProducts').mockImplementation(() =>
      Promise.resolve({
        products: [
          { id: '1', title: 'Test Product 1' },
          { id: '2', title: 'Test Product 2' },
        ],
      })
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

    expect(result).toMatchObject({
      statusCode: 200,
      body: expect.stringContaining('{"id":"1","title":"Test Product 1"},{"id":"2","title":"Test Product 2"}'),
    });
    spyOn.mockRestore();
  });
});
