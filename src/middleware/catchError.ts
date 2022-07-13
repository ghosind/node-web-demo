import { Next } from 'koa';

import { AppContext } from '../context';

/**
 * Catch uncaught error and recover.
 * @param ctx Koa context.
 * @param next Next middleware or handler.
 * @example
 * koa.use(catchError);
 */
export async function catchError(ctx: AppContext, next: Next) {
  try {
    await next();
  } catch (err: any) {
    ctx.logger.error(err);
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {
        error: err.message || err,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        error: 'Internal Server Error',
      };
    }
  }
}
