import type { AWS } from '@serverless/typescript';

export const baseServerlessConfiguration: Omit<AWS, 'service'> = {
  frameworkVersion: '3',
  package: {
    individually: true,
    excludeDevDependencies: true,
  },
  plugins: ['serverless-esbuild'],
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      target: 'node18',
      sourcemap: true,
      sourcesContent: false,
      exclude: ['aws-sdk'],
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  provider: {
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs18.x',
    memorySize: 128,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
};
