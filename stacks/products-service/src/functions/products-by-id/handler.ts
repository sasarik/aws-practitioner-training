import mockResponse from '../mock-data/mock-products-response.json';
import { formatJSONSuccessResponse } from '@aws-practitioner-training/serverless-utils';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatErrorResponse } from '@aws-practitioner-training/serverless-utils';
import * as console from 'console';

// TODO AR get rid off on it after data from DB populate
export const getAvailableProducts = async (): Promise<{ products: { id: string }[] }> => Promise.resolve(mockResponse);

export const main = async (event: APIGatewayProxyEvent) => {
  try {
    const {
      pathParameters: { productId = '' },
    } = event;
    const { products } = await getAvailableProducts();
    const productById = products.find((product) => product.id.toLowerCase() === productId.toLowerCase());
    if (productById) {
      return formatJSONSuccessResponse({ product: productById });
    }
    return formatErrorResponse(404, 'Product not found');
  } catch (error: unknown) {
    console.log('The internal error occurred: ', error);
    return formatErrorResponse(500, 'Server Internal Error');
  }
};
