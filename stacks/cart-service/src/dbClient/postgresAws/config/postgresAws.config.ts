import { registerAs } from '@nestjs/config';

export default registerAs('pgAwsConfig', () => ({
  arn: process.env.PG_ARN,
  region: process.env.AwsRegion,
  database: process.env.PG_DATABASE,
}));
