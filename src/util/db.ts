import { DataSource } from 'typeorm';

import { Store, Order, User } from '../entity';

export const createDBConnection = async () => {
  const isProduction = process.env.NODE_ENV === 'production';

  const dataSource = new DataSource({
    type: 'mysql',
    database: process.env.DB_NAME || 'demo',
    host: process.env.DB_HOST || 'localhost',
    port: Number.parseInt(process.env.DB_PORT || '', 10) || 3306,
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'pass',
    entities: [
      Store,
      Order,
      User,
    ],
    synchronize: !isProduction,
    logging: !isProduction,
  });

  return dataSource.initialize();
};
