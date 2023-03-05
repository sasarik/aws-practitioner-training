import { buildLambdaHandlerPath } from '@aws-practitioner-training/serverless-utils';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const importProductsFile = {
  handler: buildLambdaHandlerPath(__dirname),
  events: [
    {
      httpApi: {
        method: 'GET',
        path: '/import',
      },
    },
  ],
  description:
    'Using a request with a ...?fileName=[name-of-csv-file] with products and created a new **Signed URL** with the following key: `[[inputStorage]]/${fileName}`',
  environment: {
    ProductsImportBucketName: process.env.PRODUCTS_IMPORT_BUCKET_NAME,
    ProductsImportBucketInputStorageKey: process.env.PRODUCTS_IMPORT_BUCKET_INPUT_KEY,
    AwsRegion: process.env.AWS_REGION,
  },
};
