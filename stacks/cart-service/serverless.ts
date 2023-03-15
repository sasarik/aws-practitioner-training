import type { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';
import { bootstrap } from './src/functions';

const SERVICE_NAME = 'cart-service';

const serverlessConfiguration = <AWS>{
  ...baseServerlessConfiguration,
  service: SERVICE_NAME,
  useDotenv: true,
  provider: {
    ...baseServerlessConfiguration.provider,
    iam: {
      role: {
        name: `${SERVICE_NAME}--${baseServerlessConfiguration.provider.region}--${baseServerlessConfiguration.provider.stage}--LambdasRole`,
      },
    },
  },
  functions: {
    bootstrap,
  },
};

module.exports = serverlessConfiguration;
