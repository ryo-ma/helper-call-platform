
import { InputType,Field, } from '@nestjs/graphql';

@InputType()
export class CreateFacilityInput {

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  type: string;
}