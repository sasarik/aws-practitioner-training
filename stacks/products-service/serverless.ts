import type { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';
import { getProductsList, getProductsById } from './src/functions';
import { createProduct } from './src/functions';

// ************* To allow lambda's operate with DynamoDB Table **********************************
// 1. IAM: Go to policies
// 2. Choose the appropriate DynamoDB policy (Read or FullAccess per needs)
// 3. From Policy Actions - Select "Attach" and Attach it to the role that is used by this Lambda

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
  functions: { getProductsList, getProductsById, createProduct },
};

module.exports = serverlessConfiguration;
