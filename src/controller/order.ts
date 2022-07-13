import { ControllerBase } from '.';
import { NotFoundError } from '../error';
import { OrderService } from '../service';

export class OrderController extends ControllerBase {
  async listOrders() {
    const storeId = this.ctx.params.id;
    const srv = new OrderService(this.ctx);

    if (!storeId) {
      throw new NotFoundError();
    }
    const data = await srv.listOrdersByStoreId(storeId);

    return { data };
  }
}
