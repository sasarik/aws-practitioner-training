import { S3Event } from 'aws-lambda';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import csvParser from 'csv-parser';
import { asStream } from '../lib';
import * as console from 'console';

const ProductsImportBucketName = process.env.ProductsImportBucketName;
const AwsRegion = process.env.AwsRegion;

const parseProducts = async (s3BucketKey: string) => {
  const response = await new S3Client({ region: AwsRegion }).send(
    new GetObjectCommand({
      Bucket: ProductsImportBucketName,
      Key: s3BucketKey,
    })
  );
  const stream = asStream(response).pipe(csvParser({}));
  for await (const record of stream) {
    console.log('Product: ', record);
  }
};

export const main = async (event: S3Event) => {
  try {
    console.log(`~~~~~ Importing file(s) Job started`);
    console.log('~~~~~ Payload(S3::TriggeredEvent::Records): ', event.Records);
    for (const record of event.Records) {
      const key = record.s3.object.key;
      console.log(`~~~~~ Processing file: "${key}"...`);
      await parseProducts(key);
      console.log(`~~~~~ The "${key}" proceed successfully`);
    }
  } catch (error) {
    console.error('~~~~~ The error occurred: ', error);
  } finally {
    console.log(`~~~~~ Importing file(s) Job complete`);
  }
};
