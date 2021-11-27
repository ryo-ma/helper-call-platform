import { InputType,Field, } from '@nestjs/graphql';

@InputType()
export class CreateCallInput {

  @Field()
  isCanceled: boolean;

  @Field()
  serialCode: string;

  @Field({nullable: true})
  deviceId: number;
}