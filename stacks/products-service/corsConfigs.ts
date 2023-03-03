export const ALLOWED_ORIGINS = ['https://d177vmkb52wotz.cloudfront.net', 'http://localhost:4200'];

export const ALLOWED_HEADERS = ['Content-Type', 'Authorization'];

export const httpApiGatewayCorsConfig = Object.freeze({
  cors: {
    allowedOrigins: ALLOWED_ORIGINS,
    allowedHeaders: ALLOWED_HEADERS,
    allowedMethods: ['GET', 'POST'],
    maxAge: 600,
  },
});
