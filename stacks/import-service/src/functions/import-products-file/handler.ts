import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatErrorResponse, formatJSONSuccessResponse } from '@helpers/common';
import { assertNotEmptyString, ValidationError } from '@helpers/validation';

const AwsRegion = process.env.AwsRegion;
const ProductsImportBucketName = process.env.ProductsImportBucketName;
const inputStorage = process.env.ProductsImportBucketInputStorageKey;

export const generateSignedUrl = async (fileName) => {
  const client = new S3Client({ region: AwsRegion });
  const command = new PutObjectCommand({
    Bucket: ProductsImportBucketName,
    Key: `${inputStorage}/${fileName}`,
    ContentType: 'text/csv',
  });
  return await getSignedUrl(client, command, { expiresIn: 3600 });
};

export const main = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('~~~~~ Payload(queryStringParameters): ', event.queryStringParameters);
    const fileName = event.queryStringParameters?.fileName;
    assertNotEmptyString('"csv" fileName ', fileName);
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
