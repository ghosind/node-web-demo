import { DataSource } from 'typeorm';
import { Logger } from 'winston';

import { AppContext } from '../context';

/**
 * Service class base.
 */
export class ServiceBase {
  protected ctx: AppContext;

  protected logger: Logger;

  protected connection: DataSource;

  constructor(ctx: AppContext) {
    this.ctx = ctx;
    this.logger = ctx.logger;
    this.connection = ctx.connection;
  }
}
