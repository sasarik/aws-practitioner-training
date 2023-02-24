import * as dotenv from 'dotenv';
import { buildLambdaHandlerPath } from '@aws-practitioner-training/serverless-utils';
import process from 'process';

dotenv.config();

export const resolveCORS = {
  handler: buildLambdaHandlerPath(__dirname),
  events: [
    {
      http: {
        method: 'options',
        path: 'products',
      },
    },
  ],
  description: 'Performs a products service CORS resolve',
  environment: {
    publicUrls: process.env.PUBLIC_DOMAINS,
  },
};
