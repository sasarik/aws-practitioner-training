import {
  formatErrorResponse,
  formatJSONSuccessResponse,
  generateUUID,
  ValidationError,
} from '@aws-practitioner-training/serverless-utils';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient, ExecuteTransactionCommand } from '@aws-sdk/client-dynamodb';
import { assertProductIsValid, AvailableProduct } from '../lib';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { isString } from '@powwow-js/core';

const ProductsTableName = process.env.ProductsTableName;
const StocksTableName = process.env.StocksTableName;
const AwsRegion = process.env.AwsRegion;

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: AwsRegion }));

export const createAvailableProduct = async (product: AvailableProduct) => {
  const productId = generateUUID();
  const transactionalInsert = new ExecuteTransactionCommand({
    TransactStatements: [
      {
        Statement: `INSERT INTO "${ProductsTableName}" VALUE {'id':?, 'title':?, 'description':?, 'price':?}`,
        Parameters: [
          { S: productId },
          { S: product.title },
          { S: product.description },
          { N: product.price.toString() },
        ],
      },
      {
        Statement: `INSERT INTO "${StocksTableName}" VALUE {'productId':?, 'count':?}`,
        Parameters: [{ S: productId }, { N: product.count?.toString() ?? '0' }],
      },
    ],
  });
  const output = await dynamo.send(transactionalInsert);
  return { productId, output };
};

export const main = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('~~~~~ Payload: ', event.body);
    const product = isString(event.body) ? JSON.parse(event.body) : event.body;
    assertProductIsValid(product);
    const { productId, output } = await createAvailableProduct(product);
    console.log('~~~~~ DB::created: ', `id:${productId}`, output);
    return formatJSONSuccessResponse({ href: `/products/${productId}` }, 201, 'Product successfully created');
  } catch (error: unknown) {
    console.error('~~~~~ The error occurred: ', error);
    if (error instanceof ValidationError) {
      return formatErrorResponse(400, 'Request is Bad');
    }
    return formatErrorResponse(500, 'Server Error Internal');
  }
};
