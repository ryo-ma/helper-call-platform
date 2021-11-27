import { Body, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";

import { LocalAuthGuard } from "./auth/local-auth.guard";
import { Token } from "./auth/token.entity";
import { User } from "./users/users.entity";
import { UsersService } from "./users/users.service";
import bcrypt = require("bcrypt");
import { CreateUserInput } from "./users/create_user.input";
import { ConfigService } from '@nestjs/config';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,

  ) {}
  @UseGuards(LocalAuthGuard)
  @Mutation(() => Token)
  async login(
    @Args({ name: "username" }) username: string,
    @Args({ name: "password" }) password: string,
    @Context() context,
  ) {
    return this.authService.login(context.req.user);
  }

  @Mutation(() => User)
  async singup(@Args("user") user: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(user.password, Number(this.configService.get<number>("PASSWORD_SALT_ROUNDS")));
    const result = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });
    return this.usersService.findById(result.identifiers[0].id);
  }
}
