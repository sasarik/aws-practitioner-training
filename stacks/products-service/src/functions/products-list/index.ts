import { buildLambdaHandlerPath } from '@helpers/common';

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
};
