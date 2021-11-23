
import { Entity, Column, JoinColumn, Unique, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from "class-validator";
import { User } from '../users/users.entity';

@Entity()
@ObjectType()
@Unique(['serialCode'])
export class Device{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(32, 32, {message: 'The serialCode must be at 32 characters'})
  @IsNotEmpty({ message: 'The serialCode is required' })
  serialCode: string;

  @Column()
  userId: number;

  @ManyToOne(type => User, user => user.devices)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  @Length(2, 50, {message: 'The name must be at least 2 but not longer than 50 characters'})
  name: string;

  @Column()
  @Length(6, 14, {message: 'The tel must be at least 6 but not longer than 14 characters'})
  tel: string;
}