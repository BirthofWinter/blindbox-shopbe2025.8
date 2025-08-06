import { Provide, Inject } from '@midwayjs/core';
import { Order } from '../model/order';
import { OrderRepository } from '../repository/order.repository';

@Provide()
export class OrderService {
  @Inject()
  orderRepo: OrderRepository;

  async createOrder(
    items: { blindBoxId: number; quantity: number }[],
    totalPrice: number,
    userId: number
  ) {
    const order = new Order();
    order.items = items;
    order.totalPrice = totalPrice;
    order.creator = { id: userId } as any;
    return await this.orderRepo.saveOrder(order);
  }

  async getAllOrders() {
    return await this.orderRepo.findAll();
  }

  async getOrderById(id: number) {
    return await this.orderRepo.findById(id);
  }

  async deleteOrderById(id: number) {
    return await this.orderRepo.deleteById(id);
  }
}
