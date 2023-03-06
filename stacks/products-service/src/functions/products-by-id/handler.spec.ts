import * as productByIdHandler from './handler';

describe('getProductsById tests', () => {
  let getProductByIdMock;
  beforeEach(() => {
    getProductByIdMock = jest
      .spyOn(productByIdHandler, 'getProductById')
      .mockImplementation((productId) =>
        productId === '2'
          ? Promise.resolve({ id: '2', title: 'Test Product To Find', count: 2, description: '22', price: 22 })
          : Promise.reject(new Error('Test Product Not Found.'))
      );
  });
  afterEach(() => {
    getProductByIdMock.mockRestore();
  });

  it('should find product by id', async () => {
    const result = await productByIdHandler.handlerImpl({
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
      pathParameters: { productId: '2' },
    });

    expect(result).toMatchObject({
      statusCode: 200,
      body: expect.stringContaining('"id":"2","title":"Test Product To Find"'),
    });
  });

  it('should return "Not Found" if no products by criteria(s)', async () => {
    const result = await productByIdHandler.handlerImpl({
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
      statusCode: 500,
      body: expect.stringContaining('Server Internal Error'),
    });
  });
});
