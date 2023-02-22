import { buildLambdaHandlerPath } from '@aws-practitioner-training/serverless-utils';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

// ************* To allow Scan of DynamoDB Table *************
// 1. IAM: Go to policies
// 2. Choose the appropriate DynamoDB policy
// 3. From Policy Actions - Select "Attach" and Attach it to the role that is used by this Lambda

export const getProductsById = {
  handler: buildLambdaHandlerPath(__dirname),
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
      },
    },
  ],
  description: 'The find product by provided id function',
  environment: {
    ProductsTableName: process.env.PRODUCTS_TABLE_NAME,
    StocksTableName: process.env.STOCKS_TABLE_NAME,
  },
};
