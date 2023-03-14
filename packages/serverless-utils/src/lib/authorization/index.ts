import {
  APIGatewayIAMAuthorizerResult,
  APIGatewayRequestAuthorizerEventV2,
} from 'aws-lambda/trigger/api-gateway-authorizer';

export class UnauthorizedError extends Error {}

export const unauthorizedError = (message: string): UnauthorizedError => new UnauthorizedError(message);

export const generateApiGatewayAuthorizerResult = (options: {
  principalId: string;
  Resource: string;
  Effect: 'Allow' | 'Deny';
}): APIGatewayIAMAuthorizerResult => {
  const { principalId, Resource, Effect } = options;
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect,
          Resource,
        },
      ],
    },
  };
};

type Credentials = { username: string; password: string };

const extractBasicAuthorizerCredentials = (encodedToken: string): Credentials => {
  const [username, password] = Buffer.from(encodedToken, 'base64').toString('utf-8').split(':');
  return { username, password };
};

export function assertIsValidBasicAuthorizerTrigger(
  triggerEvent: unknown
): asserts triggerEvent is APIGatewayRequestAuthorizerEventV2 {
  if (!triggerEvent || triggerEvent['type'] != 'REQUEST') {
    throw unauthorizedError(`Expect to have the valid "AuthorizerTrigger" event payload`);
  }
  const event = triggerEvent as APIGatewayRequestAuthorizerEventV2;
  if (!event.headers?.['authorization']) {
    throw unauthorizedError(`Expect to have the valid "authorization" header defined, but got nothing`);
  }
  const encodedCredentials = event.headers['authorization'];

  const [method = '', token = ''] = encodedCredentials.split(' ');
  if (method !== 'Basic' || !token) {
    throw unauthorizedError(`Expect to have the valid Basic "authorization" token provided`);
  }
  const { username, password } = extractBasicAuthorizerCredentials(token);
  if (!username || !password) {
    throw unauthorizedError(`Expect to have the valid Basic "authorization" token value provided`);
  }
}

export const getBasicAuthorizerCredentials = (triggerEvent: APIGatewayRequestAuthorizerEventV2): Credentials => {
  return extractBasicAuthorizerCredentials(triggerEvent.headers['authorization'].split(' ')[1]);
};
