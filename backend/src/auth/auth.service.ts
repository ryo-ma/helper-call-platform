import { Injectable } from '@nestjs/common';
import bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';

type PasswordOmitUser = Omit<User, 'password'>;

interface JWTPayload  {
  userId: User['id'];
  userEmail: User['email'];
}


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UsersService) {}

  async validateUser(username: User['email'], password: User['password']): Promise<PasswordOmitUser | null> {
    const user = await this.usersService.findByEmail(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;

  }

  async login(user: PasswordOmitUser) {
    const payload: JWTPayload = { userId: user.id, userEmail: user.email};

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}