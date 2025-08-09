// src/controller/blindBox.controller.ts
import { Controller, Post, Get, Put, Del, Param, Body, Inject } from '@midwayjs/core';
import { BlindBoxService } from '../service/blindBox.service';
import { BlindBox } from '../model/blindBox';

// 定义响应接口
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Controller('/blindbox')
export class BlindBoxController {
  @Inject()
  blindBoxService: BlindBoxService;

  @Post('/')
  async create(@Body() body: { price: number; type: string }): Promise<ApiResponse> {
    try {
      const result = await this.blindBoxService.create(body.price, body.type);
      return { success: true, message: '创建盲盒成功', data: result };
    } catch (error) {
      return { success: false, message: error.message || '创建盲盒失败' };
    }
  }

  @Get('/')
  async getAll(): Promise<ApiResponse> {
    try {
      const result = await this.blindBoxService.findAll();
      return { success: true, message: '获取盲盒列表成功', data: result };
    } catch (error) {
      return { success: false, message: error.message || '获取盲盒列表失败' };
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<ApiResponse> {
    try {
      const result = await this.blindBoxService.findById(id);
      if (!result) {
        return { success: false, message: '盲盒不存在' };
      }
      return { success: true, message: '获取盲盒成功', data: result };
    } catch (error) {
      return { success: false, message: error.message || '获取盲盒失败' };
    }
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() data: Partial<BlindBox>): Promise<ApiResponse> {
    try {
      // 确保 price 为数字类型
      if (data.price !== undefined) {
        const price = Number(data.price);
        if (isNaN(price)) {
          return { success: false, message: '价格必须是有效的数字' };
        }
        data.price = price;
      }
      const result = await this.blindBoxService.update(id, data);
      return { success: true, message: result };
    } catch (error) {
      return { success: false, message: error.message || '更新盲盒失败' };
    }
  }

  @Del('/:id')
  async delete(@Param('id') id: number): Promise<ApiResponse> {
    try {
      const result = await this.blindBoxService.delete(id);
      return { success: true, message: result };
    } catch (error) {
      return { success: false, message: error.message || '删除盲盒失败' };
    }
  }
}
