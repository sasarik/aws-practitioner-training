import { registerAs } from '@nestjs/config';

export default registerAs('pgAwsConfig', () => ({
  host: process.env.PgHost,
  port: +process.env.PgPort,
  user: process.env.PgUserName,
  password: process.env.PgUserPassword,
  database: process.env.PgDataBase,
}));
