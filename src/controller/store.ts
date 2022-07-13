import { ControllerBase } from '.';
import { StoreService } from '../service';

export class StoreController extends ControllerBase {
  async listFarms() {
    const srv = new StoreService(this.ctx);

    const data = await srv.listStores();

    return { data };
  }
}
