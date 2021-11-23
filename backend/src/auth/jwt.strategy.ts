import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../users/users.entity';


interface JWTPayload  {
  userId: User['id'];
  userEmail: User['email'];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // TODO: ConfigServiceがundefinedになるので後ほど調査
      secretOrKey: "secret"
    });
  }

  async validate(payload: JWTPayload): Promise<JWTPayload> {
    return { userId: payload.userId, userEmail: payload.userEmail};
  }
}