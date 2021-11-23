import { UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { GraphqlJwtAuthGuard } from '../auth/graphql-jwt-auth.guard';


@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService){
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query(returns => User)
  async getUser(@Args({ name: 'id', type: () => Int }) id: number): Promise<User> {
    return await this.usersService.findById(id);
  }
}