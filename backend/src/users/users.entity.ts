import { Entity, Column, Unique, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType,Field, ID, } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Device } from '../devices/devices.entity';

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
  @Field()
  name: string;

  @Column()
  @Length(6, 14, {message: 'The tel must be at least 6 but not longer than 14 characters'})
  @Field()
  tel: string;

  @ManyToOne(type => Device, device => device.user)
  devices: Device[];
}