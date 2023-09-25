import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Images } from '@src/entities/Images.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  entities: [Images],
  synchronize: true,
  migrations: ['./src/databases/migrations/*.js'],
};

export default config;
