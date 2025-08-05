import { Controller, Post, Body, Inject } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/register')
  async register(@Body() body: { nickname: string; password: string }): Promise<string> {
    return await this.userService.register(body.nickname, body.password);
  }

  @Post('/login')
  async login(@Body() body: { nickname: string; password: string }): Promise<string> {
    return await this.userService.login(body.nickname, body.password);
  }
}
