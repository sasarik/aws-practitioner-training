import { Response } from './headers';

export const formatJSONSuccessResponse = (response: NonNullable<Record<string, unknown>>, message?: string) => {
  return {
    headers: {
      ...Response.ContentType.AppJSON,
    },
    statusCode: 200,
    body: JSON.stringify({
      message: message ?? 'This is AWS APIGateway + AWS Lambda',
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
      message: `This is AWS APIGateway + AWS Lambda: ${message ?? 'Not Found'}`,
    }),
  };
};

export const buildLambdaHandlerPath = (workingDirectory: string, lambdaHandlerName = 'main') => {
  return `${workingDirectory.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.${lambdaHandlerName}`;
};
