import { Controller, Post, Get, Put, Body, Param, Inject } from '@midwayjs/core';
import { UserService } from '../service/user.service';

// 定义响应接口
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/register')
  async register(@Body() body: { nickname: string; password: string }): Promise<ApiResponse> {
    const result = await this.userService.register(body.nickname, body.password);
    if (result === '注册成功') {
      return { success: true, message: '注册成功' };
    } else {
      return { success: false, message: result };
    }
  }

  @Post('/login')
  async login(@Body() body: { nickname: string; password: string }): Promise<ApiResponse> {
    const result = await this.userService.login(body.nickname, body.password);
    if (result === '登录成功') {
      // 获取用户信息以返回用户ID
      const user = await this.userService.findByNickname(body.nickname);
      if (!user) {
        return { success: false, message: '用户不存在' };
      }
      return { 
        success: true, 
        message: '登录成功',
        data: {
          id: user.id,
          nickname: user.nickname,
          balance: user.balance
        }
      };
    } else {
      return { success: false, message: result };
    }
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<ApiResponse> {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        return { success: false, message: '用户不存在' };
      }
      return { success: true, message: '获取用户信息成功', data: user };
    } catch (error) {
      return { success: false, message: '获取用户信息失败' };
    }
  }

  @Put('/:id/balance')
  async updateBalance(@Param('id') id: number, @Body() body: { balance: number }): Promise<ApiResponse> {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        return { success: false, message: '用户不存在' };
      }
      await this.userService.updateBalance(id, body.balance);
      return { success: true, message: '余额更新成功' };
    } catch (error) {
      return { success: false, message: error.message || '余额更新失败' };
    }
  }
}
