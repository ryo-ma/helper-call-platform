import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, Length } from "class-validator";

@Entity()
@ObjectType()
export class Facility {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Length(2, 50, {
    message: "The name must be at least 2 but not longer than 50 characters",
  })
  @IsNotEmpty({ message: "The name is required" })
  @Field()
  name: string;

  @Column()
  @Length(2, 32, { message: "The type must be at 32 characters" })
  @IsNotEmpty({ message: "The type is required" })
  @Field()
  type: string;

  @Column("float")
  @Length(2, 32, { message: "The longitude must be at 32 characters" })
  @Field()
  longitude: number;

  @Column("float")
  @Length(2, 32, { message: "The latitude must be at 32 characters" })
  @Field()
  latitude: number;

  @Column()
  @Length(2, 80, { message: "The address must be at 80 characters" })
  @IsNotEmpty({ message: "The address is required" })
  @Field()
  address: string;
}
