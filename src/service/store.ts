import { ServiceBase } from './base';
import { Store } from '../entity';

export class StoreService extends ServiceBase {
  async listStores() {
    const repository = this.connection.getRepository(Store);
    const stores = await repository.find({ select: ['id', 'name'] });

    return stores;
  }
}
