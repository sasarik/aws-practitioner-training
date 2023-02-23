import { Response } from './headers';

export const mapItemsById = <T extends object>(idProp: string, items: T[]) => {
  const resultMap = new Map<string, T>();
  items.forEach((item) => {
    if (idProp in item) {
      resultMap.set(item[idProp], item);
    }
  });
  return resultMap;
};

const MSG_PREFIX = 'APIGateway/AWSLambda:';

export const formatJSONSuccessResponse = <T>(
  response: NonNullable<T>,
  statusCode: 200 | 201 = 200,
  message?: string
) => {
  return {
    headers: {
      ...Response.ContentType.AppJSON,
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
      ...Response.ContentType.AppJSON,
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
