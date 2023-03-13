import { buildLambdaHandlerPath } from '@helpers/common';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const basicAuthorizer = {
  handler: buildLambdaHandlerPath(__dirname),
  description:
    'Takes a Basic Authorization token, decode it and check that credentials provided by token exist in the lambda environment variable',
  environment: {
    sasarik: process.env.sasarik,
  },
};
