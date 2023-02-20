import { HEADERS } from './headers';

export const formatJSONSuccessResponse = (response: NonNullable<Record<string, unknown>>, message?: string) => {
  return {
    headers: {
      ...HEADERS.RESPONSE.CONTENT_TYPE_APP_JSON,
    },
    statusCode: 200,
    body: JSON.stringify({
      message: message ?? 'This is AWS APIGateway + AWS Lambda',
      ...response,
    }),
  };
};

export const buildLambdaHandlerPath = (workingDirectory: string, lambdaHandlerName = 'main') => {
  return `${workingDirectory.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.${lambdaHandlerName}`;
};

// TODO AR del this
export function slsUtils(): string {
  return 'sls-utils';
}
