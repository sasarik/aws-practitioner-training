import { formatErrorResponse, formatJSONSuccessResponse } from '@helpers/common';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { getProductById } from '@helpers/db-client';

export const main = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('~~~~~ Payload: ', event.pathParameters);
    const product = await getProductById(event.pathParameters.productId);
    if (product) {
      return formatJSONSuccessResponse({ product });
    }
    return formatErrorResponse(404, 'Product not found');
  } catch (error: unknown) {
    console.error('~~~~~ The error occurred: ', error);
    return formatErrorResponse(500, 'Server Internal Error');
  }
};
