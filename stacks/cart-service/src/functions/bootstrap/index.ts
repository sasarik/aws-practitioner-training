import { buildLambdaHandlerPath } from '@helpers/common';
import * as dotenv from 'dotenv';

dotenv.config();

export const bootstrap = {
  handler: buildLambdaHandlerPath(__dirname),
  description: 'Cart service NestJS based Application',
  events: [
    {
      http: {
        method: 'ANY',
        path: '/',
      },
    },
    {
      http: {
        method: 'ANY',
        path: '{proxy+}',
      },
    },
  ],
  environment: {
    // sasarik: process.env.sasarik,
  },
};
