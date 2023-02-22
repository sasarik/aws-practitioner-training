import { buildLambdaHandlerPath } from '@aws-practitioner-training/serverless-utils';

// ************* To allow operations with DynamoDB Table(s) *************
// 1. IAM: Go to policies
// 2. Choose the appropriate DynamoDB policy
// 3. From Policy Actions - Select "Attach" and Attach it to the role that is used by this Lambda

export const getProductsList = {
  handler: buildLambdaHandlerPath(__dirname),
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
      },
    },
  ],
  description: 'The products list retrieve function',
  environment: {
    ProductsTableName: 'aws-practitioner-training-products',
    StocksTableName: 'aws-practitioner-training-stocks',
  },
};
