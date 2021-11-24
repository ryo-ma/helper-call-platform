import { Entity, Column, Unique, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType,Field, ID, } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Device } from '../devices/devices.entity';
import { Visit } from '../visits/visits.entity';

@Entity()
@ObjectType()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column()
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  @Field()
  email: string;

  @Column()
  password: string;

  @Column()
  @Length(2, 50, {message: 'The name must be at least 2 but not longer than 50 characters'})
  @IsNotEmpty({ message: 'The name is required' })
  @Field()
  name: string;

  @Column()
  @Length(6, 14, {message: 'The tel must be at least 6 but not longer than 14 characters'})
  @IsNotEmpty({ message: 'The tel is required' })
  @Field()
  tel: string;

  @OneToMany(type => Device, device => device.user)
  @Field(() => [Device])
  devices: Device[];

  @OneToMany(type => Visit, visit => visit.user)
  @Field(() => [Visit])
  visits: Visit[];
}