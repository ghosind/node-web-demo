import { Next } from 'koa';
import jwt from 'jsonwebtoken';

import { AppContext } from '../context';

/**
 * Validate user token, and return user id.
 * @param token User token without prefix 'bearer'.
 * @returns user id
 */
const validateToken = async (ctx: AppContext, token: string): Promise<number | null> => {
  try {
    const payload = jwt.verify(token, process.env.KEY_SECRET || '');

    if (!payload.sub) {
      return null;
    }

    const sub = Number.parseInt(typeof payload.sub === 'function' ? payload.sub() : payload.sub, 10);

    return sub;
  } catch (err: any) {
    ctx.logger.error(`Unrecognized token ${token}`);
    return null;
  }
};

/**
 * Parse request header 'Authorization' field, and store user id into `ctx.state`.
 */
export const auth = async (ctx: AppContext, next: Next) => {
  let token = ctx.get('Authorization');

  if (token) {
    token = token.replace(/^bearer /i, '');

    const userId = await validateToken(ctx, token);

    ctx.state.userId = userId;
  }

  return next();
};
