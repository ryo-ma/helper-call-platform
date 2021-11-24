
import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Query, Args, Context, Int } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from '../auth/graphql-jwt-auth.guard';
import { Call } from './calls.entity';
import { CallsService } from './calls.service';
import { CreateCallInput } from './create_call.input';

@Resolver((of) => Call)
export class CallsResolver {
  constructor(private callsService: CallsService) {

  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(returns => Call)
  async createCall(@Args({name: "call"}) call: CreateCallInput, @Context() context) {
    const result = await this.callsService.create(call);
    return this.callsService.findById(result.identifiers[0].id);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query(returns => Call)
  async getCall(@Args({ name: 'id', type: () => Int }) id: number): Promise<Call> {
    return await this.callsService.findById(id);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query(returns => [Call])
  async getCalls(): Promise<Call[]> {
    return await this.callsService.findAll();
  }
}
