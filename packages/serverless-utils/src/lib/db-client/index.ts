import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient, ExecuteTransactionCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { AvailableProduct, ProductDbItem, StockDbItem } from '../schemas';
import { generateUUID, mapItemsById } from '../common';
import { AttributeValue } from '@aws-sdk/client-dynamodb/dist-types/models';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const ProductsTableName = process.env.ProductsTableName;
const StocksTableName = process.env.StocksTableName;
const AwsRegion = process.env.AwsRegion;
const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: AwsRegion }));

export const unmarshallDbItem = (item: Record<string, AttributeValue>) => {
  if (item) {
    return unmarshall(item);
  }
  return item;
};

export const createAvailableProduct = async (product: AvailableProduct) => {
  const productId = generateUUID();
  const transactionalInsert = new ExecuteTransactionCommand({
    TransactStatements: [
      {
        Statement: `INSERT INTO "${ProductsTableName}" VALUE {'id':?, 'title':?, 'description':?, 'price':?}`,
        Parameters: [
          { S: productId },
          { S: product.title },
          { S: product.description },
          { N: product.price.toString() },
        ],
      },
      {
        Statement: `INSERT INTO "${StocksTableName}" VALUE {'productId':?, 'count':?}`,
        Parameters: [{ S: productId }, { N: product.count?.toString() ?? '0' }],
      },
    ],
  });
  const output = await dynamo.send(transactionalInsert);
  return { product: { ...product, id: productId }, output };
};

export const updateAvailableProduct = async (product: AvailableProduct) => {
  const transactionalInsert = new ExecuteTransactionCommand({
    TransactStatements: [
      {
        Statement: `UPDATE "${ProductsTableName}" SET title = ?, description = ?, price = ? WHERE id = ?`,
        Parameters: [
          { S: product.title },
          { S: product.description },
          { N: product.price.toString() },
          { S: product.id },
        ],
      },
      {
        Statement: `UPDATE "${StocksTableName}" SET "count" = ? WHERE productId = ?`,
        Parameters: [{ N: product.count?.toString() ?? '0' }, { S: product.id }],
      },
    ],
  });
  const output = await dynamo.send(transactionalInsert);
  return { productId: product.id, output };
};

export const deleteAvailableProduct = async (productId: string) => {
  const transactionalDelete = new ExecuteTransactionCommand({
    TransactStatements: [
      {
        Statement: `DELETE FROM "${ProductsTableName}" WHERE id = ?`,
        Parameters: [{ S: productId }],
      },
      {
        Statement: `DELETE FROM "${StocksTableName}" WHERE productId = ?`,
        Parameters: [{ S: productId }],
      },
    ],
  });
  const output = await dynamo.send(transactionalDelete);
  return { productId, output };
};

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

export const getProductById = async (id: string): Promise<AvailableProduct> => {
  if (!id) return undefined;

  const [product, stock] = await Promise.all([
    dynamo.send(
      new GetItemCommand({
        TableName: ProductsTableName,
        Key: {
          id: { S: id },
        },
      })
    ),
    dynamo.send(
      new GetItemCommand({
        TableName: StocksTableName,
        Key: {
          productId: { S: id },
        },
      })
    ),
  ]);

  if (!product.Item) return undefined;
  return <AvailableProduct>{
    ...unmarshallDbItem(product.Item),
    count: unmarshallDbItem(stock.Item)?.count ?? 0,
  };
};
