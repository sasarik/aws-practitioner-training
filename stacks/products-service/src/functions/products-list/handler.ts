import mockResponse from '../../../mock-data/mock-products-response.json';
import { formatErrorResponse, formatJSONSuccessResponse } from '@aws-practitioner-training/serverless-utils';
import { APIGatewayProxyEvent } from 'aws-lambda';
import console from 'console';

// TODO AR - to get populate "mockResponse" from s3:bucket ?
// TODO AR get rid off on it after data from DB populate
export const getAvailableProducts = async (): Promise<{ products: { id: string }[] }> => Promise.resolve(mockResponse);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const main = async (_event: APIGatewayProxyEvent) => {
  try {
    const result = await getAvailableProducts();
    return formatJSONSuccessResponse(result);
  } catch (error) {
    console.log('The internal error occurred: ', error);
    return formatErrorResponse(500, 'Server Internal Error');
  }
};
