import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../model/order';

@Provide()
export class OrderRepository {
  @InjectEntityModel(Order)
  orderModel: Repository<Order>;

  async saveOrder(order: Order) {
    return await this.orderModel.save(order);
  }

  async findAll() {
    return await this.orderModel.find({ relations: ['creator'] });
  }

  async findById(id: number) {
    return await this.orderModel.findOne({ where: { id }, relations: ['creator'] });
  }

  async deleteById(id: number) {
    return await this.orderModel.delete(id);
  }
}
