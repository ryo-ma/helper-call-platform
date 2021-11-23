import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './devices.entity';
import { DevicesResolver } from './devices.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  providers: [DevicesService, DevicesResolver],
  exports: [DevicesService],
})
export class DevicesModule {}
