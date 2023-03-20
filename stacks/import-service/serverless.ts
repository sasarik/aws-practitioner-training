import type { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';
import { importProductsFile } from './src/functions';
import { httpApiGatewayCorsConfig, S3BucketCorsConfig } from './corsConfigs';
import { importFileParser } from './src/functions/import-file-parser';

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
            Action: ['s3:ListBucket'],
            Resource: [`arn:aws:s3:::${process.env.PRODUCTS_IMPORT_BUCKET_NAME}`],
          },
          {
            Effect: 'Allow',
            Action: ['s3:PutObject', 's3:GetObject', 's3:DeleteObject'],
            Resource: [`arn:aws:s3:::${process.env.PRODUCTS_IMPORT_BUCKET_NAME}/*`],
          },
          {
            Effect: 'Allow',
            Action: ['sqs:SendMessage'],
            Resource: [{ 'Fn::GetAtt': ['ImportProductsSqsQueue', 'Arn'] }],
          },
        ],
      },
    },
    httpApi: {
      ...httpApiGatewayCorsConfig,
      authorizers: {
        apiGatewayRequestBasicAuthorizer: {
          type: 'request',
          // Fn::ImportValue here works only once, can't deploy the modified authorization-service then
          // Workaround ? https://stackoverflow.com/questions/54968683/updating-dependent-stacks
          // functionArn: { 'Fn::ImportValue': 'aws-training-BasicAuthorizerLambdaFunctionQualifiedArn' },
          functionArn: {
            'Fn::Join': [
              ':',
              [
                'arn',
                'aws',
                'lambda',
                { Ref: 'AWS::Region' },
                { Ref: 'AWS::AccountId' },
                'function',
                'aws-training-authorization-service-dev-basicAuthorizer',
              ],
            ],
          },
          identitySource: ['$request.header.authorization'],
        },
      },
    },
    logs: {
      httpApi: true,
    },
    environment: {
      ...baseServerlessConfiguration.provider.environment,
      ProductsImportQueueUrl: { Ref: 'ImportProductsSqsQueue' },
    },
  },
  // import the function via paths
  functions: {
    importProductsFile,
    importFileParser,
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
      ImportProductsSqsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: `${process.env.PRODUCTS_IMPORT_SQS_QUEUE_NAME}`,
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
