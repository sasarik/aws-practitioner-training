export const ALLOWED_ORIGINS = ['https://d177vmkb52wotz.cloudfront.net'];

export const ALLOWED_HEADERS = ['Content-Type', 'Authorization'];

export const httpApiGatewayCorsConfig = Object.freeze({
  cors: {
    allowedOrigins: ALLOWED_ORIGINS,
    allowedHeaders: ALLOWED_HEADERS,
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    maxAge: 600,
  },
});
