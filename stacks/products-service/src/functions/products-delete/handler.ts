import { formatErrorResponse, formatJSONSuccessResponse } from '@helpers/common';
import { assertNotEmptyString, ValidationError } from '@helpers/validation';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { deleteAvailableProduct } from '@helpers/db-client';

export const main = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('~~~~~ Payload: ', event.pathParameters);
    const productId = event.pathParameters.productId;
    assertNotEmptyString('id of product', productId);
    const { output } = await deleteAvailableProduct(productId);
    console.log('~~~~~ DB::delete: ', `id:${productId}`, output);
    return formatJSONSuccessResponse({}, 204, 'No Content :)');
  } catch (error: unknown) {
    console.error('~~~~~ The error occurred: ', error);
    if (error instanceof ValidationError) {
      return formatErrorResponse(400, 'Request is Bad');
    }
    return formatErrorResponse(500, 'Server Error Internal');
  }
};
