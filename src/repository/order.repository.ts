import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../model/order';

@Provide()
export class OrderRepository {
  @InjectEntityModel(Order)
  orderModel: Repository<Order>;

  async saveOrder(order: Order) {
    return await this.orderModel.save(order);
  }

  async findAll(userId?: number, status?: OrderStatus) {
    const query = this.orderModel.createQueryBuilder('order')
      .leftJoinAndSelect('order.creator', 'creator');

    if (userId) {
      query.andWhere('creator.id = :userId', { userId });
    }

    if (status) {
      query.andWhere('order.status = :status', { status });
    }

    return await query.getMany();
  }

  async findById(id: number) {
    return await this.orderModel.findOne({ where: { id }, relations: ['creator'] });
  }

  async deleteById(id: number) {
    return await this.orderModel.delete(id);
  }
}
