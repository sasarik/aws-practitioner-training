import { buildLambdaHandlerPath } from '@aws-practitioner-training/serverless-utils';

// ************* To allow Scan of DynamoDB Table *************
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
    TableName: 'aws-practitioner-training-products',
  },
};
