import * as productByIdHandler from './handler';

describe('getProductsById tests', () => {
  it('should find product by id', async () => {
    const spyOn = jest
      .spyOn(productByIdHandler, 'getAvailableProducts')
      .mockImplementation(() => Promise.resolve({ products: [{ id: '42', title: 'Test Product To Find' }] }));
    const result = await productByIdHandler.main({
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
      body: expect.stringContaining('"id":"42","title":"Test Product To Find"'),
    });
    spyOn.mockRestore();
  });

  it('should return "Not Found" if no products by criteria(s)', async () => {
    const spyOn = jest
      .spyOn(productByIdHandler, 'getAvailableProducts')
      .mockImplementation(() => Promise.resolve({ products: [{ id: '42', title: 'Test Product To Find' }] }));
    const result = await productByIdHandler.main({
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
      pathParameters: { productId: '24' },
    });

    expect(result).toMatchObject({
      statusCode: 404,
      body: expect.stringContaining('Product not found'),
    });
    spyOn.mockRestore();
  });
});
