import { buildLambdaHandlerPath } from '@helpers/common';

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
};
