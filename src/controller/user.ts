import { ControllerBase } from '.';
import { UserService } from '../service';

export class UserController extends ControllerBase {
  async createUser() {
    const srv = new UserService(this.ctx);

    const data = await srv.createRandomUser();

    this.ctx.status = 201;

    return data;
  }
}
