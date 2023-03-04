export const ALLOWED_ORIGINS = [
  'https://d177vmkb52wotz.cloudfront.net',
  // For local import/upload testing
  'http://localhost:4200',
];

export const ALLOWED_HEADERS = ['Content-Type', 'Authorization'];

export const httpApiGatewayCorsConfig = Object.freeze({
  cors: {
    allowedOrigins: ALLOWED_ORIGINS,
    allowedHeaders: ALLOWED_HEADERS,
    allowedMethods: ['GET', 'PUT'],
    maxAge: 600,
  },
});

export const S3BucketCorsConfig = [
  {
    AllowedHeaders: ['Content-Type'],
    AllowedMethods: ['PUT', 'GET'],
    AllowedOrigins: ALLOWED_ORIGINS,
    MaxAge: 3600,
  },
];
