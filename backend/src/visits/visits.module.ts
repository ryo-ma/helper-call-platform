import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';

@Module({
  providers: [VisitsService]
})
export class VisitsModule {}
