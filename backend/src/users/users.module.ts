import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { UsersService } from "./users.service";
import { UsersResolver } from './users.resolver';
import { DevicesService } from "../devices/devices.service";
import { DevicesModule } from "../devices/devices.module";

@Module({
  imports: [DevicesModule, TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
