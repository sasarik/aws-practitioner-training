import type { AWS } from '@serverless/typescript';
import * as dotenv from 'dotenv';

dotenv.config();

export const baseServerlessConfiguration: Omit<AWS, 'service'> = {
  frameworkVersion: '3',
  package: {
    individually: true,
    excludeDevDependencies: true,
  },
  plugins: ['serverless-esbuild', 'serverless-offline'],
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      target: 'node18',
      sourcemap: true,
      sourcesContent: false,
      exclude: [
        'aws-sdk',
        'aws-lambda',
        '@aws-sdk/lib-dynamodb',
        '@aws-sdk/client-dynamodb',
        '@aws-sdk/util-dynamodb',
        '@aws-sdk/client-s3',
        '@aws-sdk/s3-request-presigner',
        '@aws-sdk/client-sqs',
        '@aws-sdk/client-sns',
        '@nestjs/microservices',
        '@nestjs/websockets',
      ],
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  provider: {
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs18.x',
    profile: 'training',
    stage: 'dev',
    memorySize: 128,
    versionFunctions: false,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      AwsRegion: process.env.AWS_REGION,
      ProductsTableName: process.env.PRODUCTS_TABLE_NAME,
      StocksTableName: process.env.STOCKS_TABLE_NAME,
      ProductsImportBucketName: process.env.PRODUCTS_IMPORT_BUCKET_NAME,
      ProductsImportBucketInputStorageKey: process.env.PRODUCTS_IMPORT_BUCKET_INPUT_KEY,
      ProductsImportBucketOutputStorageKey: process.env.PRODUCTS_IMPORT_BUCKET_OUTPUT_KEY,
    },
  },
};
