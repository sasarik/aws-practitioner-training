import * as productByIdHandler from './handler';

describe('getProductsById tests', () => {
  let mockConsoleLog;
  let mockConsoleError;
  beforeAll(() => {
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {
      // This is intentional
    });
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {
      // This is intentional
    });
  });
  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
  });

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
      pathParameters: { productId: '2' },
    });

    expect(result).toMatchObject({
      statusCode: 200,
      body: expect.stringContaining('"id":"2","title":"Test Product To Find"'),
    });
  });

  it('should return error being wrongly parametrized', async () => {
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
      statusCode: 500,
      body: expect.stringContaining('Server Internal Error'),
    });
  });
});
