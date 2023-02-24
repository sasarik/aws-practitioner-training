import { buildLambdaHandlerPath } from '@aws-practitioner-training/serverless-utils';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

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
    publicUrls: process.env.PUBLIC_DOMAINS,
  },
};
