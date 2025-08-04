// src/controller/user.controller.ts
import { Controller, Post, Body } from '@midwayjs/core'; // 使用 Midway 的装饰器
import { UserService } from '../service/user.service';  // 导入 UserService

@Controller('/user')  // 使用 @Controller 装饰器
export class UserController {
  private userService: UserService;

  constructor() {
    // 手动实例化 UserService
    this.userService = new UserService();
  }

  @Post('/register')  // 使用 @Post 装饰器
  async register(@Body() body: { nickname: string; password: string }): Promise<string> {
    const { nickname, password } = body;
    return await this.userService.register(nickname, password);
  }

  @Post('/login')  // 使用 @Post 装饰器
  async login(@Body() body: { nickname: string; password: string }): Promise<string> {
    const { nickname, password } = body;
    return await this.userService.login(nickname, password);
  }
}
