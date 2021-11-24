import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphqlJwtAuthGuard } from "../auth/graphql-jwt-auth.guard";
import { CreateNotificationInput } from "./create_notification.input";
import { Notification } from "./notifications.entity";
import { NotificationsService } from "./notifications.service";

@Resolver((of) => Notification)
export class NotificationsResolver {
  constructor(private notificationService: NotificationsService) {
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation((returns) => Notification)
  async createNotification(
    @Args({ name: "notification" }) facility: CreateNotificationInput,
  ) {
    const result = await this.notificationService.create(facility);
    return this.notificationService.findById(result.identifiers[0].id);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query((returns) => Notification)
  async getNotification(
    @Args({ name: "id", type: () => Int }) id: number,
  ): Promise<Notification> {
    return await this.notificationService.findById(id);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query((returns) => [Notification])
  async getNotifications(
    @Args({ name: "id", type: () => Int }) id: number,
  ): Promise<Notification[]> {
    return await this.notificationService.findAll();
  }
}
