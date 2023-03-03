import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  formatErrorResponse,
  formatJSONSuccessResponse,
  middyfy,
  ValidationError,
} from '@aws-practitioner-training/serverless-utils';
import { assertFileNameIsValid } from '../lib';

const ProductsImportBucketName = process.env.ProductsImportBucketName;
const AwsRegion = process.env.AwsRegion;

export const generateSignedUrl = async (fileName) => {
  const client = new S3Client({ region: AwsRegion });
  const command = new PutObjectCommand({
    Bucket: ProductsImportBucketName,
    Key: `uploaded/${fileName}`,
    ContentType: 'text/csv',
  });
  return await getSignedUrl(client, command, { expiresIn: 3600 });
};

export const handlerImpl = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('~~~~~ Payload(queryStringParameters): ', event.queryStringParameters);
    const fileName = event.queryStringParameters?.fileName;
    assertFileNameIsValid(fileName);
    const url = await generateSignedUrl(fileName);
    return formatJSONSuccessResponse({ signedUrl: url });
  } catch (error: unknown) {
    console.error('~~~~~ The error occurred: ', error);
    if (error instanceof ValidationError) {
      return formatErrorResponse(400, 'Request is Bad');
    }
    return formatErrorResponse(500, 'Server Error Internal');
  }
};

export const main = middyfy(handlerImpl);
