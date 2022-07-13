import path from 'path';

import {
  createLogger, format, Logger, transports,
} from 'winston';
import * as Transport from 'winston-transport';
import 'winston-daily-rotate-file';

export interface LoggerOptions {
  path?: string;

  console?: boolean;
}

/**
 * Create a new logger.
 * @param options Logger configurations.
 */
export const getLogger = (options?: LoggerOptions): Logger => {
  const trans: Transport[] = [
    new transports.DailyRotateFile({
      dirname: options?.path || path.resolve('./logs'),
      filename: 'app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
    }),
    new transports.Console(),
  ];

  const logger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.printf(({
        timestamp, level, message, requestId,
      }) => `[${
        timestamp
      }] ${
        requestId ? `[${requestId}] ` : ''}[${level.toUpperCase()
      }] - ${
        message
      }`),
    ),
    transports: trans,
  });

  return logger;
};

export { Logger };
