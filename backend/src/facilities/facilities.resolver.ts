import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from '../auth/graphql-jwt-auth.guard';
import { CreateFacilityInput } from './CreateFacilityInput.input';
import { Facility } from './facilities.entity';
import { FacilitiesService } from './facilities.service';

@Resolver()

@Resolver((of) => Facility)
export class FacilitiesResolver {
  constructor(private facilityService: FacilitiesService) {

  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(returns => Facility)
  async createFacility(@Args({name: "facility"}) facility: CreateFacilityInput) {
    const result = await this.facilityService.create(facility);
    return this.facilityService.findById(result.identifiers[0].id);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query(returns => Facility)
  async getFacility(@Args({ name: 'id', type: () => Int }) id: number): Promise<Facility> {
    return await this.facilityService.findById(id);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query(returns => [Facility])
  async getFacilities(@Args({ name: 'id', type: () => Int }) id: number): Promise<Facility[]> {
    return await this.facilityService.findAll();
  }
}

