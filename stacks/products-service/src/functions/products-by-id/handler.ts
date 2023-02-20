import mockResponse from '../mocks/mock-products-response.json';
import { formatJSONSuccessResponse } from '@aws-practitioner-training/serverless-utils';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatErrorResponse } from '@aws-practitioner-training/serverless-utils';
import * as console from 'console';

export const main = async (event: APIGatewayProxyEvent) => {
  console.log('ProxyEvent: ', event);
  try {
    const {
      pathParameters: { productId = '' },
    } = event;
    const productById = mockResponse.products.find((product) => product.id.toLowerCase() === productId.toLowerCase());
    if (productById) {
      return formatJSONSuccessResponse(productById);
    }
    return formatErrorResponse(404, 'Product not found');
  } catch (error: unknown) {
    console.log('The internal error occurred: ', error);
    return formatErrorResponse(500, 'Server Internal Error');
  }
};
