import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './devices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  providers: [DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {}
