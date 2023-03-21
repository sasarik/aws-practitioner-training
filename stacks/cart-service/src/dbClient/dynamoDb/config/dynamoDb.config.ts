import { registerAs } from '@nestjs/config';

export default registerAs('dynamoDbConfig', () => ({
  productsTable: process.env.ProductsTableName,
  stocksTable: process.env.StocksTableName,
}));
