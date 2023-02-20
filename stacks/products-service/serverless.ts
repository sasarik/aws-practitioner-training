import type { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';
import { getProductsList } from './src/functions';

const serverlessConfiguration: AWS = {
  ...baseServerlessConfiguration,
  // overrides
  service: 'aws-training-products-service',
  provider: {
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs18.x',
  },
  // import the function via paths
  functions: { getProductsList },
};

module.exports = serverlessConfiguration;
