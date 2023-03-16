import type { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';

const SERVICE_NAME = 'aws-training-cart-service';

const serverlessConfiguration = <AWS>{
  ...baseServerlessConfiguration,
  service: SERVICE_NAME,
  provider: {
    ...baseServerlessConfiguration.provider,
    iam: {
      role: {
        name: `${SERVICE_NAME}--${baseServerlessConfiguration.provider.region}--${baseServerlessConfiguration.provider.stage}--LambdasRole`,
      },
    },
    environment: {
      ...baseServerlessConfiguration.provider.environment,
      PgHost: process.env.PG_HOST,
      PgPort: process.env.PG_PORT,
      PgDataBase: process.env.PG_DATABASE,
      PgUserName: process.env.PG_USERNAME,
      PgUserPassword: process.env.PG_PASSWORD,
    },
  },
  functions: {
    bootstrap: {
      handler: 'dist/stacks/cart-service/main.handler',
      description: 'Cart service "NestJS based Application"',
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
      environment: {
        // sasarik: process.env.sasarik,
      },
    },
  },
};

module.exports = serverlessConfiguration;
