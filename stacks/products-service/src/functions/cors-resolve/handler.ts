import { APIGatewayProxyEvent } from 'aws-lambda';
import { corsConfiguration, middyfy } from '@aws-practitioner-training/serverless-utils';

export const handlerImpl = async (event: APIGatewayProxyEvent) => {
  console.log('~~~~~ ProxyEvent: ', event);
  return {
    statusCode: 200,
    body: 'CORS preflight exercises',
  };
};

export const main = middyfy(handlerImpl).use(corsConfiguration());
