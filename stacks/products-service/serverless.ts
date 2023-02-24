import type { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';
import { getProductsList, getProductsById, createProduct, resolveCORS } from './src/functions';

const SERVICE_NAME = 'aws-training-products-service';
const STAGE = 'dev';
const REGION = 'eu-west-1';

const serverlessConfiguration: AWS = {
  ...baseServerlessConfiguration,
  // overrides
  service: SERVICE_NAME,
  provider: {
    name: 'aws',
    region: REGION,
    runtime: 'nodejs18.x',
    stage: STAGE,
    iam: {
      role: {
        name: `${SERVICE_NAME}--${REGION}--${STAGE}--LambdasRole`,
        managedPolicies: ['arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess'],
      },
    },
  },
  // import the function via paths
  functions: { resolveCORS, getProductsList, getProductsById, createProduct },
};

module.exports = serverlessConfiguration;
