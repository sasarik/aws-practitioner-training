import { formatErrorResponse, formatJSONSuccessResponse } from '@helpers/common';
import { SQSEvent } from 'aws-lambda';
import { createAvailableProduct } from '@helpers/db-client';
import { assertProductIsValid } from '@helpers/validation';
import { AvailableProduct } from '@helpers/schemas';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';

const parseProduct = (rawProduct: string): AvailableProduct => {
  const productImportData = JSON.parse(rawProduct);
  return {
    title: productImportData['TITLE'],
    description: productImportData['DESCRIPTION'],
    price: Number(productImportData['PRICE']),
    count: Number(productImportData['COUNT']),
  };
};

const AwsRegion = process.env.AwsRegion;
const ProductsImportSnsTopicArn = process.env.ProductsImportSnsTopicArn;

const buildProductsMailInfos = (products: AvailableProduct[]) => {
  const line = '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~';
  const {
    body: msgBody,
    evaluatePrices,
    evaluateStocks,
  } = products.reduce(
    ({ body: prevBody, evaluatePrices: prevEvaluatePrices, evaluateStocks: prevEvaluateStocks }, product) => {
      return {
        evaluatePrices: prevEvaluatePrices || product.price < 20,
        evaluateStocks: prevEvaluateStocks || product.count === 0,
        body: `
          ${prevBody}\n
          id: "${product.id}"\n
          Title: "${product.title}"\n
          Description: "${product.description}"\n
          Price: ${product.price}\n
          Count: ${product.count}\n
          ${line}\n`,
      };
    },
    { body: line, evaluatePrices: false, evaluateStocks: false }
  );
  return {
    msgBody,
    evaluatePrices,
    evaluateStocks,
  };
};

const notifyCreatedProducts = async (products: AvailableProduct[]) => {
  const { msgBody, evaluateStocks, evaluatePrices } = buildProductsMailInfos(products);
  const publishParams = {
    Subject: 'The next products were successfully added',
    Message: msgBody,
    TopicArn: ProductsImportSnsTopicArn,
    MessageAttributes: {
      evaluate: {
        DataType: 'String.Array',
        StringValue: JSON.stringify(
          !evaluateStocks && !evaluatePrices
            ? ['nothing']
            : [evaluateStocks ? 'stocks' : undefined, evaluatePrices ? 'prices' : undefined].filter(Boolean)
        ),
      },
    },
  };
  const responseData = await new SNSClient({ region: AwsRegion }).send(new PublishCommand(publishParams));
  return {
    responseData,
    publishParams,
  };
};

export const main = async (event: SQSEvent) => {
  try {
    console.log('~~~~~ Payload::SQSEvent::Records', event.Records);
    const products = [];
    for (const record of event.Records) {
      const product = parseProduct(record.body);
      assertProductIsValid(product);
      const { product: addedProduct } = await createAvailableProduct(product);
      products.push(addedProduct);
      console.log('Product successfully created');
    }
    const { publishParams } = await notifyCreatedProducts(products);
    console.log('Created Products Notification(s) successfully published:', publishParams);

    return formatJSONSuccessResponse({}, 200, `The "${event.Records.length}" product(s) has been added successfully`);
  } catch (error: unknown) {
    console.error('~~~~~ The error occurred: ', error);
    return formatErrorResponse(500, 'Server Internal Error');
  }
};
