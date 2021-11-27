import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";
import { Device } from "../devices/devices.entity";

@Entity()
@ObjectType()
export class Call {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column("boolean", { default: false })
  @Field()
  isCanceled: boolean;

  @Column("date", { default: new Date() })
  @Field()
  createdAt: Date;

  @Column()
  deviceId: number;

  @ManyToOne((type) => Device, (device) => device.calls)
  @JoinColumn({ name: "deviceId" })
  @Field(() => Device)
  device: Device;
}
