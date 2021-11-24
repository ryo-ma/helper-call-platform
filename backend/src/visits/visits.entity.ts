
import { Entity, Column, Unique, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType,Field, ID, } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Device } from '../devices/devices.entity';
import { Facility } from '../facilities/facilities.entity';
import { User } from '../users/users.entity';

@Entity()
@ObjectType()
export class Visit {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column()
  @Length(0, 400, {message: 'The name must be at least 0 but not longer than 400 characters'})
  @Field()
  todayAppearance: string;

  @Column()
  @Length(0, 100, {message: 'The disabilityType must be at least 0 but not longer than 400 characters'})
  @Field()
  disabilityType: string;

  @Column()
  @Length(0, 400, {message: 'The disabilityDescription must be at least 0 but not longer than 400 characters'})
  @Field()
  disabilityDescription: string;

  @Column()
  @IsNotEmpty({ message: 'The startDateTime is required' })
  @Field()
  startDateTime: Date

  @Column()
  @IsNotEmpty({ message: 'The endDateTime is required' })
  @Field()
  endDateTime: Date

  @Column()
  facilityId: number;

  @ManyToOne(type => Facility, facility => facility.visits)
  @JoinColumn({ name: 'facilityId' })
  @Field(() => Facility)
  facility: Facility;

  @Column()
  userId: number;

  @ManyToOne(type => User, user => user.visits)
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;
}