import type { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';
import { httpApiGatewayCorsConfig } from './corsConfigs';

const SERVICE_NAME = 'aws-training-cart-service';

const serverlessConfiguration = <AWS>{
  ...baseServerlessConfiguration,
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
            Action: ['rds-data:ExecuteStatement'],
            Resource: process.env.PG_ARN,
          },
          // {
          //   Effect: 'Allow',
          //   Action: ['secretsmanager:GetSecretValue'],
          //   Resource:
          //     '???',
          // },
        ],
      },
    },
    httpApi: {
      ...httpApiGatewayCorsConfig,
    },
    environment: {
      ...baseServerlessConfiguration.provider.environment,
      PG_ARN: process.env.PG_ARN,
      PG_HOST: process.env.PG_HOST,
      PG_PORT: process.env.PG_PORT,
      PG_DATABASE: process.env.PG_DATABASE,
      PG_USERNAME: process.env.PG_USERNAME,
      PG_PASSWORD: process.env.PG_PASSWORD,
    },
  },
  functions: {
    bootstrap: {
      handler: 'dist/stacks/cart-service/main.handler',
      description: 'Cart service "NestJS based Application"',
      timeout: 29,
      events: [
        {
          httpApi: {
            method: 'ANY',
            path: '/',
          },
        },
        {
          httpApi: {
            method: 'ANY',
            path: '/{proxy+}',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
