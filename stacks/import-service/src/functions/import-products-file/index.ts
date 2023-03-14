import { buildLambdaHandlerPath } from '@helpers/common';

export const importProductsFile = {
  handler: buildLambdaHandlerPath(__dirname),
  events: [
    {
      httpApi: {
        method: 'GET',
        path: '/import',
        authorizer: {
          name: 'apiGatewayRequestBasicAuthorizer',
        },
      },
    },
  ],
  description:
    'Using a request with a ...?fileName=[name-of-csv-file] with products and created a new **Signed URL** with the following key: `[[inputStorage]]/${fileName}`',
};
