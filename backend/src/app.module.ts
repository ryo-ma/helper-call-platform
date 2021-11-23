import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesModule } from './devices/devices.module';
import { VisitsModule } from './visits/visits.module';
import { FacilitiesService } from './facilities/facilities.service';
import { FacilitiesModule } from './facilities/facilities.module';
import { NotificationsModule } from './notifications/notifications.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { CallsModule } from './calls/calls.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    AuthModule,
    DevicesModule,
    VisitsModule,
    FacilitiesModule,
    NotificationsModule,
    CallsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
