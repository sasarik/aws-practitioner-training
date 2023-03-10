import { buildLambdaHandlerPath } from '@helpers/common';

export const getProductsById = {
  handler: buildLambdaHandlerPath(__dirname),
  events: [
    {
      httpApi: {
        method: 'GET',
        path: '/products/{productId}',
      },
    },
  ],
  description: 'The find product by provided id function',
};
