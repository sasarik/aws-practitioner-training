import { buildLambdaHandlerPath } from '@aws-practitioner-training/serverless-utils';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const getProductsList = {
  handler: buildLambdaHandlerPath(__dirname),
  events: [
    {
      httpApi: {
        method: 'GET',
        path: '/products',
      },
    },
  ],
  description: 'The products list retrieve function',
  environment: {
    ProductsTableName: process.env.PRODUCTS_TABLE_NAME,
    StocksTableName: process.env.STOCKS_TABLE_NAME,
  },
};
