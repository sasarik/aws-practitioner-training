import type { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';
import { createProduct, deleteProduct, getProductsById, getProductsList } from './src/functions';
import { httpApiGatewayCorsConfig } from './corsConfigs';
import { updateProduct } from './src/functions/products-update';

const SERVICE_NAME = 'aws-training-products-service';

const serverlessConfiguration: AWS = {
  ...baseServerlessConfiguration,
  // overrides
  service: SERVICE_NAME,
  provider: {
    ...baseServerlessConfiguration.provider,
    iam: {
      role: {
        name: `${SERVICE_NAME}--${baseServerlessConfiguration.provider.region}--${baseServerlessConfiguration.provider.stage}--LambdasRole`,
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
    updateProduct,
    deleteProduct,
  },
};

module.exports = serverlessConfiguration;
