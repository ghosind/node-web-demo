import { Next } from 'koa';

import { AppContext } from '../context';
import { UnauthorizedError } from '../error';

/**
 * Check authorization status, and throw 401 unauthorized error if it's not log in.
 */
export const authRequired = (ctx: AppContext, next: Next) => {
  const { userId } = ctx.state;

  if (!userId) {
    throw new UnauthorizedError();
  }

  return next();
};
