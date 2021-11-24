import { UseGuards } from "@nestjs/common";
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { User } from "./users.entity";
import { UsersService } from "./users.service";
import { GraphqlJwtAuthGuard } from "../auth/graphql-jwt-auth.guard";
import { DevicesService } from "../devices/devices.service";

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService, private devicesService: DevicesService) {
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query((returns) => User)
  async getUser(
    @Args({ name: "id", type: () => Int }) id: number,
  ): Promise<User> {
    return await this.usersService.findById(id);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @ResolveField()
  async devices(@Parent() user: User) {
    return this.devicesService.findByUser(user.id);
  }
}
