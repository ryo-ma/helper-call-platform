import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, Length } from "class-validator";
import { Notification } from "../notifications/notifications.entity";
import { Visit } from "../visits/visits.entity";

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

  @OneToMany((type) => Notification, (notification) => notification.facility)
  @Field(() => [Notification])
  notifications: Notification[];

  @OneToMany((type) => Visit, (visit) => visit.facility)
  @Field(() => [Visit])
  visits: Visit[];
}
