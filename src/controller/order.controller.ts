import { Controller, Post, Get, Del, Param, Body, Inject } from '@midwayjs/core';
import { OrderService } from '../service/order.service';

@Controller('/order')
export class OrderController {
  @Inject()
  orderService: OrderService;

  @Post('/')
  async create(
    @Body()
    body: {
      items: { blindBoxId: number; quantity: number }[];
      totalPrice: number;
      userId: number;
    }
  ) {
    return await this.orderService.createOrder(body.items, body.totalPrice, body.userId);
  }

  @Get('/')
  async getAll() {
    return await this.orderService.getAllOrders();
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
