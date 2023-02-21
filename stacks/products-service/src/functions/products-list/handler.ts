import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { formatErrorResponse, formatJSONSuccessResponse } from '@aws-practitioner-training/serverless-utils';
import { APIGatewayProxyEvent } from 'aws-lambda';
import console from 'console';

const TableName = process.env.TableName;
const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const getAvailableProducts = async () => {
  const result = await dynamo.send(new ScanCommand({ TableName }));
  return result.Items;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const main = async (_event: APIGatewayProxyEvent) => {
  try {
    const productItems = await getAvailableProducts();
    return formatJSONSuccessResponse({ products: productItems });
  } catch (error) {
    console.log('The internal error occurred: ', error);
    return formatErrorResponse(500, 'Server Internal Error');
  }
};
