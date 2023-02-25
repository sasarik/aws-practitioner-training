import { APIGatewayProxyEvent } from 'aws-lambda';
import { middyfy } from '@aws-practitioner-training/serverless-utils';

/**
 * For the cors resolving manually exercises (OPTIONS + this Lambda)
 * @param {APIGatewayProxyEvent} event
 * @return {Promise<{body: string, statusCode: number}>}
 */
export const handlerImpl = async (event: APIGatewayProxyEvent) => {
  console.log('~~~~~ ProxyEvent: ', event);
  return {
    statusCode: 200,
    body: 'CORS preflight exercises',
  };
};

export const main = middyfy(handlerImpl);
