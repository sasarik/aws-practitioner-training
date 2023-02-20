import mockResponse from '../mocks/mock-products-response.json';
import { formatJSONSuccessResponse } from '@aws-practitioner-training/serverless-utils';
import { APIGatewayProxyEvent } from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const main = async (_event: APIGatewayProxyEvent) => {
  // TODO AR - to get populate "mockResponse" from s3:bucket ?
  return formatJSONSuccessResponse(mockResponse);
};
