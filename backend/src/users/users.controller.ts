import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { InsertResult } from "typeorm";
import bcrypt = require("bcrypt");

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {
  }
  @Get(":id")
  async get(@Param("id") id: string): Promise<User> {
    return await this.usersService.findById(Number(id));
  }
  @Post()
  async create(@Body() user: User): Promise<InsertResult> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });
    return createdUser;
  }
}
