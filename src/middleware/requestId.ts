import { Context, Next } from 'koa';
import { v4 } from 'uuid';

/**
 * Generate a random uuid as request id, store into `ctx.state` and set
 * to 'X-Request-ID' header field.
 * @param ctx Koa context.
 * @example
 * koa.use(requestId);
 */
export const requestId = async (ctx: Context, next: Next) => {
  const id = v4();

  ctx.state.requestId = id;
  ctx.set('X-Request-ID', id);

  return next();
};
