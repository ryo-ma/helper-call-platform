import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from "class-validator";

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @Column()
  password: string;

  @Column()
  @Length(2, 50, {message: 'The name must be at least 2 but not longer than 50 characters'})
  name: string;

  @Column()
  @Length(6, 14, {message: 'The tel must be at least 6 but not longer than 14 characters'})
  tel: string;
}