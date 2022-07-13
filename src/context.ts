import { Context } from 'koa';
import { DataSource } from 'typeorm';
import { Logger } from 'winston';

export interface AppContext extends Context {
  logger: Logger;

  connection: DataSource;
}
