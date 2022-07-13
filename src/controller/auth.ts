import { ControllerBase } from '.';
import { AuthService } from '../service';

export class AuthController extends ControllerBase {
  async login() {
    const { email, password } = this.ctx.request.body;

    const srv = new AuthService(this.ctx);

    const token = await srv.login(email, password);

    return { token };
  }
}
