import type { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';
import { getProductsList, getProductsById, createProduct } from './src/functions';
import { httpApiGatewayCorsConfig } from './corsConfigs';

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
    profile: 'training',
    stage: STAGE,
    iam: {
      role: {
        name: `${SERVICE_NAME}--${REGION}--${STAGE}--LambdasRole`,
        managedPolicies: ['arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess'],
      },
    },
    httpApi: {
      ...httpApiGatewayCorsConfig,
    },
    logs: {
      httpApi: true,
    },
  },
  // import the function via paths
  functions: {
    getProductsList,
    getProductsById,
    createProduct,
  },
};

module.exports = serverlessConfiguration;
