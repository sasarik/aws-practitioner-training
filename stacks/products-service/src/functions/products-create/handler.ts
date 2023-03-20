import { formatErrorResponse, formatJSONSuccessResponse } from '@helpers/common';
import { assertProductIsValid, ValidationError } from '@helpers/validation';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { createAvailableProduct } from '@helpers/db-client';

export const main = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('~~~~~ Payload: ', event.body);
    const product = JSON.parse(event.body);
    assertProductIsValid(product);
    const {
      product: { id: productId },
      output,
    } = await createAvailableProduct(product);
    console.log('~~~~~ DB::created: ', `id:${productId}`, output);
    return formatJSONSuccessResponse({ href: `/products/${productId}` }, 201, 'Product successfully created');
  } catch (error: unknown) {
    console.error('~~~~~ The error occurred: ', error);
    if (error instanceof ValidationError) {
      return formatErrorResponse(400, 'Request is Bad');
    }
    return formatErrorResponse(500, 'Server Error Internal');
  }
};
