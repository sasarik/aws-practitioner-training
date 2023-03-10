import * as productByIdHandler from './handler';
import * as dbClient from '@helpers/db-client';
import { ExecuteTransactionCommandOutput } from '@aws-sdk/lib-dynamodb';
import { PublishCommandOutput } from '@aws-sdk/client-sns';

const queuedProduct = Object.freeze({
  TITLE: 'product title',
  DESCRIPTION: 'product description',
  PRICE: 10,
  COUNT: 8,
});
const parsedProduct = Object.freeze({
  count: 8,
  description: 'product description',
  price: 10,
  title: 'product title',
});
const addedProduct = Object.freeze({
  id: '111222333',
  ...parsedProduct,
});

describe('getProductsById tests', () => {
  let mockConsoleInfoLog;
  let mockConsoleError;
  beforeAll(() => {
    mockConsoleInfoLog = jest.spyOn(console, 'log').mockImplementation(() => {
      // This is intentional
    });
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {
      // This is intentional
    });
  });
  afterAll(() => {
    mockConsoleInfoLog.mockRestore();
    mockConsoleError.mockRestore();
  });

  it('should get products from queue, add them to Db and notify via email', async () => {
    const dbClientSpy = jest.spyOn(dbClient, 'createAvailableProduct').mockReturnValue(
      Promise.resolve({
        product: addedProduct,
        output: {} as ExecuteTransactionCommandOutput,
      })
    );

    const notifyClientSpy = jest.spyOn(productByIdHandler, 'notifyCreatedProducts').mockReturnValue(
      Promise.resolve({
        responseData: {} as PublishCommandOutput,
        publishParams: {
          Subject: 'The subject',
          Message: 'The Message',
          TopicArn: 'The ARN of Topic',
          MessageAttributes: {
            evaluate: { DataType: 'String.Array', StringValue: JSON.stringify(['nothing']) },
          },
        },
      })
    );

    const result = await productByIdHandler.main({
      Records: [
        {
          messageId: undefined,
          receiptHandle: undefined,
          body: JSON.stringify(queuedProduct),
          attributes: undefined,
          messageAttributes: undefined,
          awsRegion: undefined,
          eventSource: undefined,
          md5OfBody: undefined,
          eventSourceARN: undefined,
        },
      ],
    });
    expect(dbClient.createAvailableProduct).toHaveBeenCalledTimes(1);
    expect(dbClient.createAvailableProduct).toHaveBeenCalledWith(parsedProduct);
    expect(productByIdHandler.notifyCreatedProducts).toHaveBeenCalledTimes(1);
    expect(productByIdHandler.notifyCreatedProducts).toHaveBeenCalledWith([addedProduct]);

    expect(result).toMatchObject({
      statusCode: 200,
      body: expect.stringContaining('product(s) has been added successfully'),
    });
    dbClientSpy.mockRestore();
    notifyClientSpy.mockRestore();
  });
});
