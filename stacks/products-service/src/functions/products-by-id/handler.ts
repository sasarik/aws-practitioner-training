import { formatErrorResponse, formatJSONSuccessResponse } from '@aws-practitioner-training/serverless-utils';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { omittingDbCommandsOutputAttributes } from '../lib';

const ProductsTableName = process.env.ProductsTableName;
const StocksTableName = process.env.StocksTableName;
const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));

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
    ...omittingDbCommandsOutputAttributes(product.Item),
    count: omittingDbCommandsOutputAttributes(stock.Item)?.count ?? 0,
  };
};

export const main = async (event: APIGatewayProxyEvent) => {
  try {
    const {
      pathParameters: { productId },
    } = event;
    const product = await getProductById(productId);
    if (product) {
      return formatJSONSuccessResponse({ product });
    }
    return formatErrorResponse(404, 'Product not found');
  } catch (error: unknown) {
    // console.log('The internal error occurred: ', error);
    return formatErrorResponse(500, 'Server Internal Error');
  }
};
