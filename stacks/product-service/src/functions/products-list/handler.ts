import mockResponse from './mock-response.json';
import { formatJSONSuccessResponse } from '@aws-practitioner-training/serverless-utils';

export const main = async () => {
  // TODO AR - to get populate "mockResponse" from s3:bucket ?
  return formatJSONSuccessResponse(mockResponse);
};
