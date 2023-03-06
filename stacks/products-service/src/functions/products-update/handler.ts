import { formatErrorResponse, formatJSONSuccessResponse } from '@helpers/common';
import { assertNotEmptyString, assertProductIsValid, ValidationError } from '@helpers/validation';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { updateAvailableProduct } from '@helpers/db-client';

export const main = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('~~~~~ Payload: ', event.body);
    const product = JSON.parse(event.body);
    assertProductIsValid(product);
    assertNotEmptyString('id of product', product.id);
    const { productId, output } = await updateAvailableProduct(product);
    console.log('~~~~~ DB::update: ', `id:${productId}`, output);
    return formatJSONSuccessResponse({ href: `/products/${productId}` }, 200, 'Product successfully updated');
  } catch (error: unknown) {
    console.error('~~~~~ The error occurred: ', error);
    if (error instanceof ValidationError) {
      return formatErrorResponse(400, 'Request is Bad');
    }
    return formatErrorResponse(500, 'Server Error Internal');
  }
};
