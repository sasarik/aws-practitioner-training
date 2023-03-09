import { formatErrorResponse, formatJSONSuccessResponse } from '@helpers/common';
import { SQSEvent } from 'aws-lambda';
import { createAvailableProduct } from '@helpers/db-client';
import { assertProductIsValid } from '@helpers/validation';

export const main = async (event: SQSEvent) => {
  try {
    console.log('~~~~~ Payload::SQSEvent::Records', event.Records);
    for (const record of event.Records) {
      const productImportData = JSON.parse(record.body);
      const product = {
        title: productImportData['TITLE'],
        description: productImportData['DESCRIPTION'],
        price: Number(productImportData['PRICE']),
        count: Number(productImportData['COUNT']),
      };
      assertProductIsValid(product);
      await createAvailableProduct(product);
    }
    return formatJSONSuccessResponse({});
  } catch (error: unknown) {
    console.error('~~~~~ The error occurred: ', error);
    return formatErrorResponse(500, 'Server Internal Error');
  }
};
