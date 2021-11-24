import { UseGuards } from "@nestjs/common";
import { ContextCreator } from "@nestjs/core/helpers/context-creator";
import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphqlJwtAuthGuard } from "../auth/graphql-jwt-auth.guard";
import { CreateVisitInput } from "./create_visit.input";
import { Visit } from "./visits.entity";
import { VisitsService } from "./visits.service";

@Resolver((of) => Visit)
export class VisitsResolver {
  constructor(private visitsService: VisitsService) {
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation((returns) => Visit)
  async createVisit(
    @Args({ name: "visit" }) visit: CreateVisitInput,
    @Context() context,
  ) {
    if (visit.userId == null) {
      visit.userId = context.req.user.id;
    }
    const result = await this.visitsService.create(visit);
    return this.visitsService.findById(result.identifiers[0].id);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query((returns) => Visit)
  async getVisit(
    @Args({ name: "id", type: () => Int }) id: number,
  ): Promise<Visit> {
    return await this.visitsService.findById(id);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query((returns) => [Visit])
  async getVisits(
    @Args({ name: "id", type: () => Int }) id: number,
  ): Promise<Visit[]> {
    return await this.visitsService.findAll();
  }
}
