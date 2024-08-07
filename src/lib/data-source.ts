import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

console.log('test',process.env.DATABASE_HOST)

const config = {
  type: 'postgres',
  // host: `${process.env.DATABASE_HOST}`,
  // port: process.env.DATABASE_PORT,
  // username: `${process.env.DATABASE_USERNAME}`,
  // password: `${process.env.DATABASE_PASSWORD}`,
  // database: `${process.env.DATABASE_NAME}`,

  //dev
  // host: 'localhost',
  // port: 5432,
  // username: 'postgres',
  // password: '4y7sV96vA9wv46VR',
  // database: 'jne',

  // prod
  host: 'localhost',
  port: 5432,
  username: 'jnelearn_user-postgre',
  password: '&{xVTJNw6R^s',
  database: 'jnelearn_login',

  entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
  migrations: ['src/config/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
