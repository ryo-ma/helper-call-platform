
import { InputType,Field, } from '@nestjs/graphql';

@InputType()
export class CreateVisitInput {

  @Field()
  todayAppearance: string;

  @Field()
  disabilityType: string;

  @Field()
  disabilityDescription: string;

  @Field()
  startDateTime: Date;

  @Field()
  endDateTime: Date;

  @Field()
  userId: number;

  @Field()
  facilityId: number;
}