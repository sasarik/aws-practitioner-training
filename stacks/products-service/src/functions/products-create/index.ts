import { buildLambdaHandlerPath } from '@helpers/common';

export const createProduct = {
  handler: buildLambdaHandlerPath(__dirname),
  events: [
    {
      httpApi: {
        method: 'POST',
        path: '/products',
      },
    },
  ],
  description: 'Creating a new entry item in Products *= Stocks tables',
};
