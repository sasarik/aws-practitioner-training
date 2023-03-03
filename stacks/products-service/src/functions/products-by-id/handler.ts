import { formatErrorResponse, formatJSONSuccessResponse, middyfy } from '@aws-practitioner-training/serverless-utils';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshallDbItem } from '../lib';

const ProductsTableName = process.env.ProductsTableName;
const StocksTableName = process.env.StocksTableName;
const AwsRegion = process.env.AwsRegion;

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: AwsRegion }));

export const getProductById = async (id: string) => {
  if (!id) return undefined;

  const [product, stock] = await Promise.all([
    dynamo.send(
      new GetItemCommand({
        TableName: ProductsTableName,
        Key: {
          id: { S: id },
        },
      })
    ),
    dynamo.send(
      new GetItemCommand({
        TableName: StocksTableName,
        Key: {
          productId: { S: id },
        },
      })
    ),
  ]);

  if (!product.Item) return undefined;
  return {
    ...unmarshallDbItem(product.Item),
    count: unmarshallDbItem(stock.Item)?.count ?? 0,
  };
};

export const handlerImpl = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('~~~~~ Payload: ', event.pathParameters);
    const product = await getProductById(event.pathParameters.productId);
    if (product) {
      return formatJSONSuccessResponse({ product });
    }
    return formatErrorResponse(404, 'Product not found');
  } catch (error: unknown) {
    console.error('~~~~~ The error occurred: ', error);
    return formatErrorResponse(500, 'Server Internal Error');
  }
};

export const main = middyfy(handlerImpl);
