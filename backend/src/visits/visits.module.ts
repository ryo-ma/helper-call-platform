import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Visit } from "./visits.entity";
import { VisitsService } from "./visits.service";
import { VisitsResolver } from "./visits.resolver";
import { FacilitiesModule } from "../facilities/facilities.module";

@Module({
  imports: [FacilitiesModule, TypeOrmModule.forFeature([Visit])],
  providers: [VisitsService, VisitsResolver],
  exports: [VisitsService],
})
export class VisitsModule {}
