import type { AWS } from '@serverless/typescript';
import { baseServerlessConfiguration } from '../../serverless.base';
import { importProductsFile } from "./src/functions";

const serverlessConfiguration = <AWS>{
  ...baseServerlessConfiguration,
  service: 'import-service',
  provider: {
    ...baseServerlessConfiguration.provider,
  },
  // import the function via paths
  functions: {
    importProductsFile
  }
};

module.exports = serverlessConfiguration;
