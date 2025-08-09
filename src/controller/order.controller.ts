import { Controller, Post, Get, Del, Put, Param, Body, Inject, Query } from '@midwayjs/core';
import { OrderService } from '../service/order.service';
import { OrderStatus } from '../model/order';

// 定义响应接口
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Controller('/order')
export class OrderController {
  @Inject()
  orderService: OrderService;

  @Post('/cart')
  async createCart(@Body() body: { userId: number }): Promise<ApiResponse> {
    try {
      const result = await this.orderService.createCart(body.userId);
      return { success: true, message: '购物车创建成功', data: result };
    } catch (error) {
      return { success: false, message: error.message || '购物车创建失败' };
    }
  }

  @Post('/cart/:orderId/items')
  async addToCart(
    @Param('orderId') orderId: number,
    @Body() body: { blindBoxId: number; quantity: number }
  ): Promise<ApiResponse> {
    try {
      const result = await this.orderService.addToCart(orderId, body);
      return { success: true, message: '添加到购物车成功', data: result };
    } catch (error) {
      return { success: false, message: error.message || '添加到购物车失败' };
    }
  }

  @Del('/cart/:orderId/items/:blindBoxId')
  async removeFromCart(
    @Param('orderId') orderId: number,
    @Param('blindBoxId') blindBoxId: number
  ): Promise<ApiResponse> {
    try {
      const result = await this.orderService.removeFromCart(orderId, blindBoxId);
      return { success: true, message: '从购物车移除成功', data: result };
    } catch (error) {
      return { success: false, message: error.message || '从购物车移除失败' };
    }
  }

  @Put('/cart/:orderId/items/:blindBoxId')
  async updateCartItemQuantity(
    @Param('orderId') orderId: number,
    @Param('blindBoxId') blindBoxId: number,
    @Body() body: { quantity: number }
  ): Promise<ApiResponse> {
    try {
      const result = await this.orderService.updateCartItemQuantity(orderId, blindBoxId, body.quantity);
      return { success: true, message: '更新购物车数量成功', data: result };
    } catch (error) {
      return { success: false, message: error.message || '更新购物车数量失败' };
    }
  }

  @Post('/cart/:orderId/checkout')
  async checkout(@Param('orderId') orderId: number): Promise<ApiResponse> {
    try {
      const result = await this.orderService.checkout(orderId);
      return { success: true, message: '购买成功', data: result };
    } catch (error) {
      return { success: false, message: error.message || '购买失败' };
    }
  }

  @Get('/')
  async getAll(
    @Query('userId') userId?: number,
    @Query('status') status?: OrderStatus
  ): Promise<ApiResponse> {
    try {
      const result = await this.orderService.getAllOrders(userId, status);
      return { success: true, message: '获取订单列表成功', data: result };
    } catch (error) {
      return { success: false, message: error.message || '获取订单列表失败' };
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<ApiResponse> {
    try {
      const result = await this.orderService.getOrderById(id);
      if (!result) {
        return { success: false, message: '订单不存在' };
      }
      return { success: true, message: '获取订单成功', data: result };
    } catch (error) {
      return { success: false, message: error.message || '获取订单失败' };
    }
  }

  @Del('/:id')
  async delete(@Param('id') id: number): Promise<ApiResponse> {
    try {
      await this.orderService.deleteOrderById(id);
      return { success: true, message: '删除订单成功' };
    } catch (error) {
      return { success: false, message: error.message || '删除订单失败' };
    }
  }
}
