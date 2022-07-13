import EventEmitter from 'events';
import { Server } from 'http';
import Koa, { Context, Next } from 'koa';
import koaBody from 'koa-body';
import { DataSource } from 'typeorm';
import { Logger } from 'winston';

import { AppContext } from './context';
import { NotFoundError } from './error';
import {
  auth, catchError, logging, requestId, route,
} from './middleware';
import { createDBConnection, getLogger } from './util';

interface AppOptions {
  port?: number | string;

  logger?: Logger;
}

export class App extends EventEmitter {
  private koa: Koa;

  private port: number | string;

  private server?: Server;

  private logger: Logger;

  private dataSource: DataSource;

  private isReady: boolean;

  private isRunning: boolean;

  constructor(options?: AppOptions) {
    super();

    this.koa = new Koa();

    this.isReady = false;
    this.isRunning = false;
    this.port = options?.port || 8000;
    this.logger = options?.logger || getLogger();

    this.init();
  }

  async run() {
    return new Promise((resolve: any) => {
      if (this.isRunning) {
        resolve();
        return;
      }

      this.isRunning = true;

      if (this.isReady) {
        this.runServer();
        resolve();
        return;
      }

      this.on('ready', () => {
        this.runServer();
        resolve();
      });
    });
  }

  close() {
    if (this.server) {
      this.server.close((err: unknown) => {
        if (err) {
          this.logger.error(`Failed to close server: ${err}`);
        }

        process.exit();
      });
    } else {
      process.exit();
    }
  }

  private async init() {
    this.koa
      .use(requestId)
      .use(async (ctx: AppContext, next: Next) => {
        // Inject logger and db connection into context.
        ctx.logger = this.logger.child({
          requestId: ctx.state.requestId,
        });
        ctx.connection = this.dataSource;

        return next();
      })
      .use(koaBody())
      .use(logging)
      .use(catchError)
      .use(auth)
      .use(route())
      .use((ctx: Context) => {
        throw new NotFoundError(`url ${ctx.path} not found.`);
      });

    this.dataSource = await createDBConnection();

    this.isReady = true;
    this.emit('ready');
  }

  private runServer() {
    this.server = this.koa.listen(this.port);
    this.logger.info(`server running at port ${this.port}`);
    this.emit('running');
  }
}
