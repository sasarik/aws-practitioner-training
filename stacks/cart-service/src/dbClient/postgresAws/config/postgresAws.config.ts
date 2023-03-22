import { registerAs } from '@nestjs/config';

export default registerAs('pgAwsConfig', () => ({
  arn: process.env.PgArn,
  region: process.env.AwsRegion,
  database: process.env.PgDataBase,
}));
