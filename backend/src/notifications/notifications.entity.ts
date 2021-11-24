
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, Length } from "class-validator";
import { Facility } from "../facilities/facilities.entity";
import { FacilitiesService } from "../facilities/facilities.service";

@Entity()
@ObjectType()
export class Notification {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;


  @Column()
  @Length(2, 32, { message: "The type must be at 32 characters" })
  @IsNotEmpty({ message: "The type is required" })
  @Field()
  type: string;

  @Column()
  facilityId: number;

  @ManyToOne(type => Facility, facility => facility.notifications)
  @JoinColumn({ name: 'facilityId' })
  @Field(() => Facility)
  facility: Facility;
}
