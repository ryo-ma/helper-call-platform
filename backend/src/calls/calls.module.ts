import { Module } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CallsResolver } from './calls.resolver';

@Module({
  providers: [CallsService, CallsResolver]
})
export class CallsModule {}
