import { formatErrorResponse, formatJSONSuccessResponse } from './serverless-utils';

describe('serverless-utils tests', () => {
  describe('formatJSONSuccessResponse', () => {
    it('should correct format success response', () => {
      expect(formatJSONSuccessResponse({ foo: 'bar' })).toMatchObject({
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: expect.any(String),
      });
    });
  });
  describe('formatErrorResponse', () => {
    it('should correct format problem json response', () => {
      expect(formatErrorResponse(400)).toMatchObject({
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.any(String),
      });
    });
  });
});
