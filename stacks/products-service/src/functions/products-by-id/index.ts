import { buildLambdaHandlerPath } from '@aws-practitioner-training/serverless-utils';

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
};
