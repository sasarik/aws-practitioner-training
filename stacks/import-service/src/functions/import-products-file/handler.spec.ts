import * as productsListHandler from './handler';

describe('importProductsFile tests', () => {
  let mockConsole;
  beforeAll(() => {
    mockConsole = jest.spyOn(console, 'log').mockImplementation(() => {
      // This is intentional
    });
  });
  afterAll(() => {
    mockConsole.mockRestore();
  });
  it('should return signed url for provided fileName', async () => {
    const spyOn = jest
      .spyOn(productsListHandler, 'generateSignedUrl')
      .mockImplementation(() => Promise.resolve('https://your-signed-url.s3.com'));

    const result = await productsListHandler.main({
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
});
