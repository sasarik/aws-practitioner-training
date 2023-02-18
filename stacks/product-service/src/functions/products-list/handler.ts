import mockResponse from './mock-response.json';
import { FancyAPIGatewayProxyEvent, formatJSONResponse, withLambdaHandler } from '@aws-practitioner-training/sls-utils';

const handler = async (event: FancyAPIGatewayProxyEvent) => {
  const { preferredCharset, preferredEncoding, preferredLanguage, preferredMediaType } = event;

  return formatJSONResponse({
    triggerEvent: {
      greetings: 'Hi,there...',
      preferredCharset,
      preferredEncoding,
      preferredLanguage,
      preferredMediaType,
    },
    ...mockResponse,
  });
};

export const main = withLambdaHandler(handler);
