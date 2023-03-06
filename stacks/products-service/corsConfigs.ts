export const ALLOWED_ORIGINS = [
  'https://d177vmkb52wotz.cloudfront.net', // used as manual deployment
  'https://d5alop7eke0n3.cloudfront.net', // used as automatic deployment
];

export const ALLOWED_HEADERS = ['Content-Type', 'Authorization'];

export const httpApiGatewayCorsConfig = Object.freeze({
  cors: {
    allowedOrigins: ALLOWED_ORIGINS,
    allowedHeaders: ALLOWED_HEADERS,
    allowedMethods: ['GET', 'POST'],
    maxAge: 600,
  },
});
