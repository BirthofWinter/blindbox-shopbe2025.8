import { Controller, Post, Get, Del, Put, Param, Body, Inject, Query } from '@midwayjs/core';
import { OrderService } from '../service/order.service';
import { OrderStatus } from '../model/order';

@Controller('/order')
export class OrderController {
  @Inject()
  orderService: OrderService;

  @Post('/cart')
  async createCart(@Body() body: { userId: number }) {
    return await this.orderService.createCart(body.userId);
  }

  @Post('/cart/:orderId/items')
  async addToCart(
    @Param('orderId') orderId: number,
    @Body() body: { blindBoxId: number; quantity: number }
  ) {
    return await this.orderService.addToCart(orderId, body);
  }

  @Del('/cart/:orderId/items/:blindBoxId')
  async removeFromCart(
    @Param('orderId') orderId: number,
    @Param('blindBoxId') blindBoxId: number
  ) {
    return await this.orderService.removeFromCart(orderId, blindBoxId);
  }

  @Put('/cart/:orderId/items/:blindBoxId')
  async updateCartItemQuantity(
    @Param('orderId') orderId: number,
    @Param('blindBoxId') blindBoxId: number,
    @Body() body: { quantity: number }
  ) {
    return await this.orderService.updateCartItemQuantity(orderId, blindBoxId, body.quantity);
  }

  @Post('/cart/:orderId/checkout')
  async checkout(@Param('orderId') orderId: number) {
    return await this.orderService.checkout(orderId);
  }

  @Get('/')
  async getAll(
    @Query('userId') userId?: number,
    @Query('status') status?: OrderStatus
  ) {
    return await this.orderService.getAllOrders(userId, status);
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.orderService.getOrderById(id);
  }

  @Del('/:id')
  async delete(@Param('id') id: number) {
    return await this.orderService.deleteOrderById(id);
  }
}
