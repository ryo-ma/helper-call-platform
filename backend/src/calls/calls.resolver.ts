import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphqlJwtAuthGuard } from "../auth/graphql-jwt-auth.guard";
import { Call } from "./calls.entity";
import { CallsService } from "./calls.service";
import { CreateCallInput } from "./create_call.input";
import { ConfigService } from "@nestjs/config";
import { LineClient } from "../clients/line_clients";

@Resolver((of) => Call)
export class CallsResolver {
  private lineClient: LineClient;
  constructor(
    private callsService: CallsService,
    configService: ConfigService,
  ) {
    this.lineClient = new LineClient(
      configService.get<string>("LINE_BOT_CHANNEL_ACCESS_TOKEN"),
    )
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation((returns) => Call)
  async createCall(
    @Args({ name: "call" }) call: CreateCallInput,
    @Context() context,
  ) {
    const result = await this.callsService.create(call);
    const messageText = "利用者からコールがされました。サポートをお願いします。";
    this.lineClient.push({
      messages: [
        { type: "text", text: messageText },
      ],
    });
    return this.callsService.findById(result.identifiers[0].id);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query((returns) => Call)
  async getCall(
    @Args({ name: "id", type: () => Int }) id: number,
  ): Promise<Call> {
    return await this.callsService.findById(id);
  }
  @UseGuards(GraphqlJwtAuthGuard)
  @Query((returns) => [Call])
  async getCalls(): Promise<Call[]> {
    return await this.callsService.findAll();
  }
}
