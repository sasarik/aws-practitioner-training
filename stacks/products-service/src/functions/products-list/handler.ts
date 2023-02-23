import {
  formatErrorResponse,
  formatJSONSuccessResponse,
  mapItemsById,
} from '@aws-practitioner-training/serverless-utils';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ProductDbItem, StockDbItem } from '../lib';

const ProductsTableName = process.env.ProductsTableName;
const StocksTableName = process.env.StocksTableName;
const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const getAvailableProductItems = async () => {
  const [products, stocks] = await Promise.all([
    dynamo.send(new ScanCommand({ TableName: ProductsTableName })),
    dynamo.send(new ScanCommand({ TableName: StocksTableName })),
  ]);

  const stocksMap = mapItemsById<StockDbItem>('productId', <StockDbItem[]>stocks.Items);

  return products.Items.map((product: ProductDbItem) => {
    return {
      ...product,
      count: stocksMap.get(product.id)?.count ?? 0,
    };
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const main = async (_event: APIGatewayProxyEvent) => {
  try {
    const productItems = await getAvailableProductItems();
    return formatJSONSuccessResponse({ products: productItems });
  } catch (error) {
    console.error('~~~~~ The error occurred: ', error);
    return formatErrorResponse(500, 'Server Internal Error');
  }
};
