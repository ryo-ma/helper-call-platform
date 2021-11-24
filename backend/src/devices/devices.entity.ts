import { Entity, Column, JoinColumn, Unique, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from "class-validator";
import { User } from '../users/users.entity';
import { Call } from '../calls/calls.entity';
import { callbackify } from 'util';

@Entity()
@ObjectType()
@Unique(['serialCode'])
export class Device{
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Length(32, 32, {message: 'The serialCode must be at 32 characters'})
  @IsNotEmpty({ message: 'The serialCode is required' })
  @Field()
  serialCode: string;

  @Column()
  @Length(2, 32, {message: 'The type must be at 32 characters'})
  @IsNotEmpty({ message: 'The type is required' })
  @Field()
  type: string;

  @Column()
  userId: number;

  @ManyToOne(type => User, user => user.devices)
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;

  @OneToMany(type => Call, call => call.device)
  @Field(() => [Call])
  calls: Call[];
}