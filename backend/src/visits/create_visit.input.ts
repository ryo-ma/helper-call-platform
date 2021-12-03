import { Field, InputType } from "@nestjs/graphql";

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

  @Field({ nullable: true })
  userId: number;

  @Field()
  facilityId: number;
}
