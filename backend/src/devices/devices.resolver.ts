import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Query, Args, Context, Int } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from '../auth/graphql-jwt-auth.guard';
import { CreateDeviceInput } from './CreateDeviceInput.input';
import { Device } from './devices.entity';
import { DevicesService } from './devices.service';

@Resolver((of) => Device)
export class DevicesResolver {
  constructor(private devicesService: DevicesService) {

  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(returns => Device)
  async createDevice(@Args({name: "device"}) device: CreateDeviceInput, @Context() context) {
    if (device.userId == null) {
      device.userId = context.req.user.id
    }
    const result = await this.devicesService.create(device);
    return this.devicesService.findById(result.identifiers[0].id);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query(returns => Device)
  async getDevice(@Args({ name: 'id', type: () => Int }) id: number): Promise<Device> {
    return await this.devicesService.findById(id);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query(returns => [Device])
  async getDevicesByUser(@Args({ name: 'id', type: () => Int }) id: number): Promise<Device[]> {
    return await this.devicesService.findByUser(id);
  }
}