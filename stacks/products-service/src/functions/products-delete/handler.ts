import {
  formatErrorResponse,
  formatJSONSuccessResponse,
  ValidationError,
} from '@aws-practitioner-training/serverless-utils';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient, ExecuteTransactionCommand } from '@aws-sdk/client-dynamodb';
import { assertNotEmpty } from '../lib';
import { APIGatewayProxyEvent } from 'aws-lambda';

const ProductsTableName = process.env.ProductsTableName;
const StocksTableName = process.env.StocksTableName;
const AwsRegion = process.env.AwsRegion;

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: AwsRegion }));

export const deleteAvailableProduct = async (productId: string) => {
  const transactionalDelete = new ExecuteTransactionCommand({
    TransactStatements: [
      {
        Statement: `DELETE FROM "${ProductsTableName}" WHERE id = ?`,
        Parameters: [{ S: productId }],
      },
      {
        Statement: `DELETE FROM "${StocksTableName}" WHERE productId = ?`,
        Parameters: [{ S: productId }],
      },
    ],
  });
  const output = await dynamo.send(transactionalDelete);
  return { productId, output };
};

export const main = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('~~~~~ Payload: ', event.pathParameters);
    const productId = event.pathParameters.productId;
    assertNotEmpty('id of product', productId);
    const { output } = await deleteAvailableProduct(productId);
    console.log('~~~~~ DB::delete: ', `id:${productId}`, output);
    return formatJSONSuccessResponse({}, 204, 'No Content :)');
  } catch (error: unknown) {
    console.error('~~~~~ The error occurred: ', error);
    if (error instanceof ValidationError) {
      return formatErrorResponse(400, 'Request is Bad');
    }
    return formatErrorResponse(500, 'Server Error Internal');
  }
};
