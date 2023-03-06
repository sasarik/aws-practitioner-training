import {
  formatErrorResponse,
  formatJSONSuccessResponse,
  ValidationError,
} from '@aws-practitioner-training/serverless-utils';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient, ExecuteTransactionCommand } from '@aws-sdk/client-dynamodb';
import { assertNotEmpty, assertProductIsValid, AvailableProduct } from '../lib';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { isString } from '@powwow-js/core';

const ProductsTableName = process.env.ProductsTableName;
const StocksTableName = process.env.StocksTableName;
const AwsRegion = process.env.AwsRegion;

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: AwsRegion }));

export const updateAvailableProduct = async (product: AvailableProduct) => {
  const transactionalInsert = new ExecuteTransactionCommand({
    TransactStatements: [
      {
        Statement: `UPDATE "${ProductsTableName}" SET title = ?, description = ?, price = ? WHERE id = ?`,
        Parameters: [
          { S: product.title },
          { S: product.description },
          { N: product.price.toString() },
          { S: product.id },
        ],
      },
      {
        Statement: `UPDATE "${StocksTableName}" SET "count" = ? WHERE productId = ?`,
        Parameters: [{ N: product.count?.toString() ?? '0' }, { S: product.id }],
      },
    ],
  });
  const output = await dynamo.send(transactionalInsert);
  return { productId: product.id, output };
};

export const main = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('~~~~~ Payload: ', event.body);
    const product = isString(event.body) ? JSON.parse(event.body) : event.body;
    assertProductIsValid(product);
    assertNotEmpty('id of product', product.id);
    const { productId, output } = await updateAvailableProduct(product);
    console.log('~~~~~ DB::update: ', `id:${productId}`, output);
    return formatJSONSuccessResponse({ href: `/products/${productId}` }, 200, 'Product successfully updated');
  } catch (error: unknown) {
    console.error('~~~~~ The error occurred: ', error);
    if (error instanceof ValidationError) {
      return formatErrorResponse(400, 'Request is Bad');
    }
    return formatErrorResponse(500, 'Server Error Internal');
  }
};
