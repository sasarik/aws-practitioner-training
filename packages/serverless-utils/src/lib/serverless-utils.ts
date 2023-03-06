import { ResponseHeader } from './headers';
import middy from '@middy/core';
import cors from '@middy/http-cors';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import * as crypto from 'crypto';

export const mapItemsById = <T extends object>(itemIdPropertyName: string, items: T[]) => {
  const resultMap = new Map<string, T>();
  items.forEach((item) => {
    if (itemIdPropertyName in item) {
      resultMap.set(item[itemIdPropertyName], item);
    }
  });
  return resultMap;
};

export const generateUUID = () => crypto.randomUUID();

export const corsConfiguration = () => {
  const getOrigin = (incomingOrigin: string) => {
    const allowedOrigins = [...(process.env.publicUrls?.split(',') ?? '')];
    console.log(`~~~~~~ CORS: AllowedOrigins:${allowedOrigins.join(',')}; incoming one: ${incomingOrigin};`);
    if (allowedOrigins.includes(incomingOrigin)) {
      console.log('~~~~~~ CORS: so, incoming one will be included.');
      return incomingOrigin;
    }
    return generateUUID();
  };

  return cors({
    headers: `${ResponseHeader.ContentType.FieldName},X-Amz-Date,${ResponseHeader.Authorization.FieldName},X-Api-Key,X-Amz-Security-Token`,
    methods: 'GET,OPTIONS,POST',
    getOrigin,
  });
};

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser());
};

const MSG_PREFIX = 'APIGateway/AWSLambda:';

export const formatJSONSuccessResponse = <T>(
  response: NonNullable<T>,
  statusCode: 200 | 201 = 200,
  message?: string
) => {
  return {
    headers: {
      ...ResponseHeader.ContentType.AppJSON,
    },
    statusCode,
    body: JSON.stringify({
      message: `${MSG_PREFIX} ${message ?? 'Ok'}`,
      ...response,
    }),
  };
};

export const formatErrorResponse = (statusCode: number, message?: string) => {
  return {
    headers: {
      ...ResponseHeader.ContentType.AppJSON,
    },
    statusCode,
    body: JSON.stringify({
      message: `${MSG_PREFIX} ${message ?? 'Not Found'}`,
    }),
  };
};

export const buildLambdaHandlerPath = (workingDirectory: string, lambdaHandlerName = 'main') => {
  return `${workingDirectory.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.${lambdaHandlerName}`;
};
