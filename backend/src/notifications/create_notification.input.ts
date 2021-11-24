import { InputType,Field, } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field()
  facilityId: number;

  @Field()
  type: string;
}