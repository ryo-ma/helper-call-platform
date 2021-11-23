import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from './facilities.entity';
import { FacilitiesResolver } from './facilities.resolver';
import { FacilitiesService } from './facilities.service';

@Module({

  imports: [TypeOrmModule.forFeature([Facility])],
  providers: [FacilitiesService, FacilitiesResolver],
  exports: [FacilitiesService],
})
export class FacilitiesModule {}
