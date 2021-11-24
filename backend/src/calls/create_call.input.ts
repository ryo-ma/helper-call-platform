import { InputType,Field, } from '@nestjs/graphql';

@InputType()
export class CreateCallInput {

  @Field()
  isCanceled: boolean;

  @Field()
  createdAt: Date;

  @Field()
  deviceId: number;
}