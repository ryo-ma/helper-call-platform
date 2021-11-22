import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { User } from "./users/users.entity";

type PasswordOmitUser = Omit<User, "password">;

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Request() req: { user: PasswordOmitUser }) {
    const user = req.user;
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Request() req: { user: PasswordOmitUser }) {
    const user = req.user;

    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
