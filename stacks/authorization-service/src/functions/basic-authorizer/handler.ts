import {
  assertIsValidBasicAuthorizerTrigger,
  generateApiGatewayAuthorizerResult,
  getBasicAuthorizerCredentials,
  UnauthorizedError,
} from '@helpers/authorization';
import { APIGatewayRequestAuthorizerEventV2 } from 'aws-lambda/trigger/api-gateway-authorizer';

export const main = async (event: APIGatewayRequestAuthorizerEventV2) => {
  try {
    console.log(`~~~~~ APIGatewayRequestAuthorizerEvent: `, event);
    assertIsValidBasicAuthorizerTrigger(event);

    const { username, password } = getBasicAuthorizerCredentials(event);

    const storedUserPassword = process.env[username];
    const Effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';
    console.log(`~~~~~ Authorization of username: "${username}"; password: "${password}" -> "${Effect}"`);

    return generateApiGatewayAuthorizerResult({
      principalId: event.headers['authorization'],
      Effect,
      Resource: event.routeArn,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      console.error('~~~~~ The UnauthorizedError occurred: ', error);
    } else {
      console.error('~~~~~ The Error occurred: ', error);
    }
    return generateApiGatewayAuthorizerResult({
      principalId: event.headers['authorization'],
      Effect: 'Deny',
      Resource: event.routeArn,
    });
  }
};
