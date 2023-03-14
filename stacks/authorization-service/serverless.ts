import type { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';
import { basicAuthorizer } from './src/functions';

const SERVICE_NAME = process.env.AUTHORIZATION_SERVICE_NAME;

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
  },
  functions: {
    basicAuthorizer,
  },
  // Seems good idea to share/export the "BasicAuthorizerLambdaFunctionQualifiedArn",
  // but it "works" only once, can't deploy the modified authorization-service then;
  // Workaround ? https://stackoverflow.com/questions/54968683/updating-dependent-stacks
  // resources: {
  //   Outputs: {
  //     BasicAuthorizerLambdaFunctionQualifiedArn: {
  //       Description: 'The ApiGateway basic authorization Lambda function output',
  //       Export: { Name: 'aws-training-BasicAuthorizerLambdaFunctionQualifiedArn' },
  //     },
  //   },
  // },
};

module.exports = serverlessConfiguration;
