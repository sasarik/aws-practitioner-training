import { buildLambdaHandlerPath } from '@aws-practitioner-training/serverless-utils';
import * as dotenv from 'dotenv';
import * as process from 'process';
import AvailableProductSchema from '../lib/AvailableProductSchema';

dotenv.config();

export const createProduct = {
  handler: buildLambdaHandlerPath(__dirname),
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        request: {
          schemas: {
            'application/json': AvailableProductSchema,
          },
        },
      },
    },
  ],
  description: 'Creating a new entry item in Products *= Stocks tables',
  environment: {
    ProductsTableName: process.env.PRODUCTS_TABLE_NAME,
    StocksTableName: process.env.STOCKS_TABLE_NAME,
  },
};
