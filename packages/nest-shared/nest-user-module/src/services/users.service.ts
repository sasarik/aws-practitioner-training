import { Injectable } from '@nestjs/common';

import { User } from '../models';
import crypto from 'crypto';

@Injectable()
export class UsersService {
  private readonly users: Record<string, User>;

  constructor() {
    this.users = {};
  }

  findOne(userId: string): User {
    return this.users[userId];
  }

  createOne({ name, password }: User): User {
    const id = crypto.randomUUID();
    const newUser = { id: name || id, name, password };

    this.users[id] = newUser;

    return newUser;
  }
}
