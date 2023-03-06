import * as handler from './handler';

describe('importProductsFile tests', () => {
  let mockConsoleInfo;
  let mockConsoleError;
  beforeAll(() => {
    mockConsoleInfo = jest.spyOn(console, 'log').mockImplementation(() => {
      // This is intentional
    });
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {
      // This is intentional
    });
  });
  afterAll(() => {
    mockConsoleInfo.mockRestore();
    mockConsoleError.mockRestore();
  });
  it('should return signed url for provided fileName', async () => {
    const spyOn = jest
      .spyOn(handler, 'generateSignedUrl')
      .mockImplementation(() => Promise.resolve('https://your-signed-url.s3.com'));

    const result = await handler.main({
      body: '',
      headers: undefined,
      httpMethod: '',
      isBase64Encoded: false,
      multiValueHeaders: undefined,
      multiValueQueryStringParameters: undefined,
      path: '',
      queryStringParameters: { fileName: 'product.csv' },
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
      signedUrl: 'https://your-signed-url.s3.com',
    });
    spyOn.mockRestore();
  });

  it('should return error being wrongly parametrized', async () => {
    const result = await handler.main({
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
      statusCode: 400,
      body: expect.stringContaining('Request is Bad'),
    });
  });
});
