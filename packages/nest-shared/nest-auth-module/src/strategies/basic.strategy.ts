import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { BasicStrategy as Strategy } from 'passport-http';

import { AuthService } from '../services/auth.service';
import { User } from '@nest-shared/user-module';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, pass: string): Promise<Omit<User, 'password'>> {
    const user = this.authService.validateUser(username, pass);

    if (!user) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...restUserProps } = user;

    return restUserProps;
  }
}
