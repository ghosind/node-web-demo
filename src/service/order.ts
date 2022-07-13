import { ServiceBase } from './base';
import { Order } from '../entity';

export class OrderService extends ServiceBase {
  async listOrdersByStoreId(storeId: string) {
    const repository = this.connection.getRepository(Order);
    const orders = await repository.find({ where: { storeId } });

    let total = 0;
    orders?.forEach((order: Order) => {
      total += order.amount;
    });

    return {
      orders,
      total,
    };
  }
}
