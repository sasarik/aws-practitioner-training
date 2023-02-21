import AWS from 'aws-sdk'; // TODO it using v3 SDK and get rid off ''aws-sdk' dependency
import productsMockData from '../products-service/mock-data/mock-products-response.json' assert { type: 'json' };
import stocksMockData from '../products-service/mock-data/mock-stocks.json' assert { type: 'json' };

AWS.config.update({ region: 'eu-west-1' });

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
  TableName: 'aws-practitioner-training-products',
  Item: {
    id: { S: id },
    description: { S: description },
    title: { S: title },
    price: { N: price.toString() },
  },
}));

const stocksDbItems = stocksMockData.stocks.map(({ product_id, count }) => ({
  TableName: 'aws-practitioner-training-stocks',
  Item: {
    product_id: { S: product_id },
    count: { N: count.toString() },
  },
}));

[...productsDbItems, ...stocksDbItems].forEach(post);
