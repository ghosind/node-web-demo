import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { ServiceBase } from './base';
import { User } from '../entity';
import { UnauthorizedError } from '../error';

export class AuthService extends ServiceBase {
  async login(email: string, password: string) {
    const repository = this.connection.getRepository(User);

    const user = await repository.findOne({ where: { email } });
    if (!user) {
      this.logger.warn(`${email} not exists`);
      throw new UnauthorizedError('Invalid credential');
    }

    const isValid = compareSync(password, user.password);
    if (!isValid) {
      this.logger.warn(`invalid password for user ${email}`);
      throw new UnauthorizedError('Invalid credential');
    }

    const token = sign(
      { sub: user.id },
      process.env.KEY_SECRET || '',
      { expiresIn: '30 days' },
    );

    return token;
  }
}
