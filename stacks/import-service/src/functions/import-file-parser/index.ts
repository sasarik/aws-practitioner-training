import { buildLambdaHandlerPath } from '@aws-practitioner-training/serverless-utils';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const importFileParser = {
  handler: buildLambdaHandlerPath(__dirname),
  // events: [
  //   {
  //     // TODO API defs
  //     httpApi: {
  //       method: 'GET',
  //       path: '/import',
  //     },
  //   },
  // ],
  description: 'Get an objects from S3, parse them using csv-parser and log each record to be shown in CloudWatch',
  environment: {
    ProductsImportBucketName: process.env.PRODUCTS_IMPORT_BUCKET_NAME,
    AwsRegion: process.env.AWS_REGION,
  },
};
