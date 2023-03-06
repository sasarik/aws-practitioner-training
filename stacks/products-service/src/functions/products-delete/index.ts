import { buildLambdaHandlerPath } from '@helpers/common';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const deleteProduct = {
  handler: buildLambdaHandlerPath(__dirname),
  events: [
    {
      httpApi: {
        method: 'DELETE',
        path: '/products/{productId}',
      },
    },
  ],
  description: 'Delete a product entry item in Products *= Stocks tables',
  environment: {
    ProductsTableName: process.env.PRODUCTS_TABLE_NAME,
    StocksTableName: process.env.STOCKS_TABLE_NAME,
    AwsRegion: process.env.AWS_REGION,
  },
};
