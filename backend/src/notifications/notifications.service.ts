import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { CreateNotificationInput } from "./create_notification.input";
import { Notification } from "./notifications.entity";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification) private readonly notificationRepository:
      Repository<
        Notification
      >,
  ) {}
  async findById(id: Notification["id"]): Promise<Notification| undefined> {
    return this.notificationRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Notification[] | undefined> {
    return this.notificationRepository.find();
  }

  async create(notification: CreateNotificationInput): Promise<InsertResult> {
    return await this.notificationRepository.insert({
      ...notification,
    });
  }
}
