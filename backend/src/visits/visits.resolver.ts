import { UseGuards } from "@nestjs/common";
import { ContextCreator } from "@nestjs/core/helpers/context-creator";
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { GraphqlJwtAuthGuard } from "../auth/graphql-jwt-auth.guard";
import { FacilitiesService } from "../facilities/facilities.service";
import { CreateVisitInput } from "./create_visit.input";
import { Visit } from "./visits.entity";
import { VisitsService } from "./visits.service";

@Resolver((of) => Visit)
export class VisitsResolver {
  constructor(
    private visitsService: VisitsService,
    private facilitiesService: FacilitiesService,
  ) {
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation((returns) => Visit)
  async createVisit(
    @Args({ name: "visit" }) visit: CreateVisitInput,
    @Context() context,
  ) {
    if (visit.userId == null) {
      visit.userId = context.req.user.userId;
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
  async getVisits(@Context() contex): Promise<Visit[]> {
    return await this.visitsService.findByUser(contex.req.user.userId);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @ResolveField()
  async facility(@Parent() visit: Visit) {
    return this.facilitiesService.findById(visit.facilityId);
  }
}
