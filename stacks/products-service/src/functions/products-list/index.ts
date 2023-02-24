import { buildLambdaHandlerPath } from '@aws-practitioner-training/serverless-utils';

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
};
