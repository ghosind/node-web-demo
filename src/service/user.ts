import { hashSync } from 'bcrypt';
import crypto from 'crypto';

import { ServiceBase } from './base';
import { User } from '../entity';

export class UserService extends ServiceBase {
  private readonly HASH_ROUND = 10;

  async createRandomUser() {
    const email = `${Math.random().toString(36).substring(2, 10)}@example.com`;
    const password = crypto.randomBytes(16).toString('hex');
    const encrypted = hashSync(password, this.HASH_ROUND);

    const repository = this.connection.getRepository(User);
    const user = new User();
    user.email = email;
    user.password = encrypted;

    await repository.save(user);

    return {
      email,
      password,
    };
  }
}
