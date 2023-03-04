import { ResponseHeader } from './headers';
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

export const errorCode = Object.freeze({
  VALIDATION: 'validation-error',
});

export class ValidationError extends Error {
  readonly errorCode: typeof errorCode.VALIDATION;

  constructor(message: string) {
    super(message);
  }
}

export const validationError = (message: string): ValidationError => new ValidationError(message);

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
