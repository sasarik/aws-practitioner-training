import AWS from 'aws-sdk'; // TODO it using v3 SDK and get rid off ''aws-sdk' dependency
import productsMockData from '../products-service/mock-data/mock-products-response.json' assert { type: 'json' };
import stocksMockData from '../products-service/mock-data/mock-stocks.json' assert { type: 'json' };
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

AWS.config.update({ region: process.env.AWS_REGION });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const post = (params) => {
  ddb.putItem(params, (err, data) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log('Success: ', { params, data });
    }
  });
};

const productsDbItems = productsMockData.products.map(({ id, description, title, price }) => ({
  TableName: process.env.PRODUCTS_TABLE_NAME,
  Item: {
    id: { S: id },
    description: { S: description },
    title: { S: title },
    price: { N: price.toString() },
  },
}));

const stocksDbItems = stocksMockData.stocks.map(({ productId, count }) => ({
  TableName: process.env.STOCKS_TABLE_NAME,
  Item: {
    productId: { S: productId },
    count: { N: count.toString() },
  },
}));

[...productsDbItems, ...stocksDbItems].forEach(post);
