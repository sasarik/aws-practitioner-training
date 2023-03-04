import type { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';
import { importProductsFile } from './src/functions';
import { httpApiGatewayCorsConfig, S3BucketCorsConfig } from './corsConfigs';
import * as process from 'process';

const SERVICE_NAME = 'aws-training-import-service';

const serverlessConfiguration = <AWS>{
  ...baseServerlessConfiguration,
  service: SERVICE_NAME,
  provider: {
    ...baseServerlessConfiguration.provider,
    iam: {
      role: {
        name: `${SERVICE_NAME}--${baseServerlessConfiguration.provider.region}--${baseServerlessConfiguration.provider.stage}--LambdasRole`,
        statements: [
          {
            Effect: 'Allow',
            Action: ['s3:PutObject'], // 's3:ListBucket' , 's3:GetObject
            Resource: [`arn:aws:s3:::${process.env.PRODUCTS_IMPORT_BUCKET_NAME}/*`],
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
  },
  // import the function via paths
  functions: {
    importProductsFile,
  },
  resources: {
    Resources: {
      Bucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: `${process.env.PRODUCTS_IMPORT_BUCKET_NAME}`,
          PublicAccessBlockConfiguration: {
            BlockPublicAcls: true,
            BlockPublicPolicy: true,
            IgnorePublicAcls: true,
            RestrictPublicBuckets: true,
          },
          CorsConfiguration: {
            CorsRules: S3BucketCorsConfig,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
