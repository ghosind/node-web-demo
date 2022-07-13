import { AppContext } from '../context';

/**
 * Controller class base.
 */
export class ControllerBase {
  protected ctx: AppContext;

  constructor(ctx: AppContext) {
    this.ctx = ctx;
  }
}
