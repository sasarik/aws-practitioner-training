import { registerAs } from '@nestjs/config';

export default registerAs('pgConfig', () => ({
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
}));
