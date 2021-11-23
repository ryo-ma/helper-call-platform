import { InputType,Field, } from '@nestjs/graphql';

@InputType()
export class CreateDeviceInput {

  @Field()
  serialCode: string;

  @Field({nullable: true})
  userId: number;

  @Field()
  type: string;
}