import { handlerPath } from '@aws-practitioner-training/sls-utils';

export const getProductsList = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
      },
    },
  ],
};
