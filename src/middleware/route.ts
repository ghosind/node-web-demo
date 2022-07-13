import { Context } from 'koa';
import Router from 'koa-router';

import { authRequired } from './auth';
import {
  ControllerBase, AuthController, StoreController, OrderController, UserController,
} from '../controller';

// eslint-disable-next-line no-unused-vars
type Constructor<T> = new (...args: any[]) => T;

/**
 * Bind controller's method to router.
 * @param Cls Controller class.
 * @param name Function name.
 */
const bind = (Cls: Constructor<ControllerBase>, name: string) => async (ctx: Context) => {
  const ins = new Cls(ctx);
  const fn = Reflect.get(ins, name);

  if (!fn || typeof fn !== 'function') {
    throw new TypeError(`Unknown method ${name} in ${Cls.name}`);
  }

  const data = await Reflect.apply(fn, ins, []);

  ctx.set('Context-Type', 'application/json');
  ctx.body = data;
};

/**
 * Bind controllers to router, and check authorization status if it's required.
 */
export const route = () => {
  const router = new Router();

  router
    .post('/login', bind(AuthController, 'login'))
    .get('/stores', authRequired, bind(StoreController, 'listStores'))
    .get('/stores/:id/orders', authRequired, bind(OrderController, 'listOrders'))
    .post('/user', bind(UserController, 'createUser'));

  return router.routes();
};
