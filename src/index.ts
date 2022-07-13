import 'reflect-metadata';

import { App } from './app';
import { getLogger } from './util';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const logger = getLogger();

const app = new App({
  port: process.env.NODE_PORT,
  logger,
});

app.run();

const signalHandler = (signal: NodeJS.Signals) => {
  logger.info(`Catch signal ${signal}, closing server...`);
  app.close();
};

process.on('uncaughtException', (err: Error) => {
  logger.error(`got uncaught exception: ${err}`);
});
process.on('unhandledRejection', (reason: unknown) => {
  logger.error(`got unhandled rejection: ${reason}`);
});
process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
