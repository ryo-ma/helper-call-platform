import { Module } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CallsResolver } from './calls.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from './calls.entity';

@Module({
  providers: [CallsService, CallsResolver],
  imports: [TypeOrmModule.forFeature([Call])],
  exports: [CallsService],
})
export class CallsModule {}
