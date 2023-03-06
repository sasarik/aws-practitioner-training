import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import * as dotenv from "dotenv";
import * as process from "process";
import { fromIni } from "@aws-sdk/credential-providers";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
// ExperimentalWarning: Importing JSON modules is an experimental feature and might change at any time
// import productsMockData from './test-data/products-initials.json' assert { type: 'json' };
// import stocksMockData from './test-data/stocks-initials.json' assert { type: 'json' };
const productsMockData = require("./test-data/products-initials.json");
const stocksMockData = require("./test-data/stocks-initials.json");
dotenv.config({ path: path.join(__dirname, "../", ".env") });

const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION, credentials: fromIni({ profile: "training" }) });
const execute = (params) => ddbClient.send(new PutItemCommand(params));

const productItemSchema = productsMockData.products.map(({ id, description, title, price }) => ({
  TableName: process.env.PRODUCTS_TABLE_NAME,
  Item: {
    id: { S: id },
    description: { S: description },
    title: { S: title },
    price: { N: price.toString() }
  }
}));

const stockItemSchema = stocksMockData.stocks.map(({ productId, count }) => ({
  TableName: process.env.STOCKS_TABLE_NAME,
  Item: {
    productId: { S: productId },
    count: { N: count.toString() }
  }
}));

console.log("****************************** Test data importing... **************************************");
await Promise.all([...productItemSchema, ...stockItemSchema].map(execute));
console.log("****************************** Test data successfully imported ******************************");
