import { formatErrorResponse, formatJSONSuccessResponse } from '@helpers/common';
import { SQSEvent } from 'aws-lambda';
import { createAvailableProduct } from '@helpers/db-client';
import { assertProductIsValid } from '@helpers/validation';
import { AvailableProduct } from '@helpers/schemas';

const parseProduct = (rawProduct: string): AvailableProduct => {
  const productImportData = JSON.parse(rawProduct);
  return {
    title: productImportData['TITLE'],
    description: productImportData['DESCRIPTION'],
    price: Number(productImportData['PRICE']),
    count: Number(productImportData['COUNT']),
  };
};

export const main = async (event: SQSEvent) => {
  try {
    console.log('~~~~~ Payload::SQSEvent::Records', event.Records);
    for (const record of event.Records) {
      const product = parseProduct(record.body);
      assertProductIsValid(product);
      await createAvailableProduct(product);
    }
    return formatJSONSuccessResponse({}, 200, `The "${event.Records.length}" product(s) has been added successfully`);
  } catch (error: unknown) {
    console.error('~~~~~ The error occurred: ', error);
    return formatErrorResponse(500, 'Server Internal Error');
  }
};
