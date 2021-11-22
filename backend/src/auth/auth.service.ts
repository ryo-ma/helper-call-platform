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

  // ユーザーを認証する
  async validateUser(email: User['email'], pass: User['password']): Promise<PasswordOmitUser | null> {
    const user = await this.usersService.findOne(email);

    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  // jwt tokenを返す
  async login(user: PasswordOmitUser) {
    // jwtにつけるPayload情報
    const payload: JWTPayload = { userId: user.id, userEmail: user.email};

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}