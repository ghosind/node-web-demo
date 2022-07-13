import { Next } from 'koa';

import { AppContext } from '../context';

/**
 * Logging request spend time.
 */
export const logging = async (ctx: AppContext, next: Next) => {
  const start = Date.now();

  const ret = await next();

  const ms = Date.now() - start;
  ctx.logger.info(`${ctx.method} ${ctx.path} ${ctx.status} ${ms}ms`);

  return ret;
};
