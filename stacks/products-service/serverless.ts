import type { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';
import { catalogBatchProcess, createProduct, deleteProduct, getProductsById, getProductsList } from './src/functions';
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
        statements: [
          {
            Effect: 'Allow',
            Action: ['sns:Publish'],
            Resource: { Ref: 'ImportProductsSnsTopic' },
          },
        ],
      },
    },
    httpApi: {
      ...httpApiGatewayCorsConfig,
    },
    logs: {
      httpApi: true,
    },
    environment: {
      ...baseServerlessConfiguration.provider.environment,
      ProductsImportSnsTopicArn: { Ref: 'ImportProductsSnsTopic' },
    },
  },
  // import the function via paths
  functions: {
    getProductsList,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct,
    catalogBatchProcess,
  },
  resources: {
    Resources: {
      ImportProductsSnsTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: `${process.env.PRODUCTS_IMPORT_SNS_TOPIC_NAME}`,
        },
      },
      ImportProductsSnsSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'sasarik@gmail.com',
          Protocol: 'email',
          TopicArn: { Ref: 'ImportProductsSnsTopic' },
        },
      },
      ImportProductsSnsLowPricesSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'js.developer.powwow@gmail.com',
          Protocol: 'email',
          TopicArn: { Ref: 'ImportProductsSnsTopic' },
          FilterPolicyScope: 'MessageAttributes',
          // Filter messages with zero count or price lower than 20
          FilterPolicy: { evaluate: ['stocks', 'prices'] },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
