import { buildLambdaHandlerPath } from '@helpers/common';

export const updateProduct = {
  handler: buildLambdaHandlerPath(__dirname),
  events: [
    {
      httpApi: {
        method: 'PUT',
        path: '/products',
      },
    },
  ],
  description: 'Update an entry item in Products *= Stocks tables',
};
