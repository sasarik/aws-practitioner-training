import middy from '@middy/core';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpContentNegotiation, { Event as HttpContentNegotiationEvent } from '@middy/http-content-negotiation';
import type { APIGatewayProxyEvent as GatewayProxyEvent } from 'aws-lambda';

export type FancyAPIGatewayProxyEvent = GatewayProxyEvent & HttpContentNegotiationEvent;

export const withLambdaHandler = (handler) =>
  middy(handler)
    .use(httpHeaderNormalizer())
    .use(
      httpContentNegotiation({
        parseCharsets: false,
        parseEncodings: false,
        parseLanguages: false,
        availableMediaTypes: ['application/json', 'text/plain'],
      })
    );

// TODO tidy up this all
export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const handlerPath = (context: string) => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;
};

// TODO AR del this
export function slsUtils(): string {
  return 'sls-utils';
}
