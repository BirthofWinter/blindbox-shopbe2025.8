import { Provide, Inject } from '@midwayjs/core';
import { Order, OrderStatus } from '../model/order';
import { OrderRepository } from '../repository/order.repository';
import { UserService } from './user.service';
import { BlindBoxService } from './blindBox.service';
import { CollectibleService } from './collectible.service';

interface CartItem {
  blindBoxId: number;
  quantity: number;
}

@Provide()
export class OrderService {
  @Inject()
  orderRepo: OrderRepository;

  @Inject()
  userService: UserService;

  @Inject()
  blindBoxService: BlindBoxService;

  @Inject()
  collectibleService: CollectibleService;

  async createCart(userId: number): Promise<Order> {
    const order = new Order();
    order.items = [];
    order.totalPrice = 0;
    order.creator = { id: userId } as any;
    order.status = OrderStatus.PENDING;
    return await this.orderRepo.saveOrder(order);
  }

  async addToCart(orderId: number, item: CartItem): Promise<Order> {
    const order = await this.orderRepo.findById(orderId);
    if (!order || order.status !== OrderStatus.PENDING) {
      throw new Error('购物车不存在或状态异常');
    }

    const blindBox = await this.blindBoxService.findById(item.blindBoxId);
    if (!blindBox) {
      throw new Error('盲盒不存在');
    }

    const existingItemIndex = order.items.findIndex(i => i.blindBoxId === item.blindBoxId);
    if (existingItemIndex > -1) {
      order.items[existingItemIndex].quantity += item.quantity;
    } else {
      order.items.push(item);
    }

    order.totalPrice = order.items.reduce((total, item) => {
      const boxPrice = blindBox.price;
      return total + (boxPrice * item.quantity);
    }, 0);

    return await this.orderRepo.saveOrder(order);
  }

  async removeFromCart(orderId: number, blindBoxId: number): Promise<Order> {
    const order = await this.orderRepo.findById(orderId);
    if (!order || order.status !== OrderStatus.PENDING) {
      throw new Error('购物车不存在或状态异常');
    }

    order.items = order.items.filter(item => item.blindBoxId !== blindBoxId);
    order.totalPrice = await this.recalculateTotal(order.items);

    return await this.orderRepo.saveOrder(order);
  }

  async updateCartItemQuantity(orderId: number, blindBoxId: number, quantity: number): Promise<Order> {
    const order = await this.orderRepo.findById(orderId);
    if (!order || order.status !== OrderStatus.PENDING) {
      throw new Error('购物车不存在或状态异常');
    }

    const itemIndex = order.items.findIndex(item => item.blindBoxId === blindBoxId);
    if (itemIndex === -1) {
      throw new Error('商品不存在于购物车中');
    }

    if (quantity <= 0) {
      order.items = order.items.filter(item => item.blindBoxId !== blindBoxId);
    } else {
      order.items[itemIndex].quantity = quantity;
    }

    order.totalPrice = await this.recalculateTotal(order.items);
    return await this.orderRepo.saveOrder(order);
  }

  async checkout(orderId: number): Promise<Order> {
    const order = await this.orderRepo.findById(orderId);
    if (!order || order.status !== OrderStatus.PENDING) {
      throw new Error('订单不存在或状态异常');
    }

    const user = await this.userService.findById(order.creator.id);
    if (!user) {
      throw new Error('用户不存在');
    }

    if (user.balance < order.totalPrice) {
      throw new Error('余额不足');
    }

    // 扣除用户余额
    await this.userService.updateBalance(user.id, user.balance - order.totalPrice);

    // 为每个购买的盲盒随机获取收藏品
    for (const item of order.items) {
      for (let i = 0; i < item.quantity; i++) {
        const randomCollectible = await this.collectibleService.getRandomCollectible(item.blindBoxId);
        // 创建新的收藏品实例
        const newCollectible = await this.collectibleService.create(
          randomCollectible.blindBox.id,
          `${randomCollectible.name} #${Math.floor(Math.random() * 10000)}`
        );
        if (!user.collectibles) {
          user.collectibles = [];
        }
        user.collectibles.push(newCollectible);
      }
    }

    // 保存用户的收藏品更新
    await this.userService.saveUser(user);

    order.status = OrderStatus.PAID;
    order.paidAt = new Date();
    return await this.orderRepo.saveOrder(order);
  }

  private async recalculateTotal(items: CartItem[]): Promise<number> {
    let total = 0;
    for (const item of items) {
      const blindBox = await this.blindBoxService.findById(item.blindBoxId);
      if (blindBox) {
        total += blindBox.price * item.quantity;
      }
    }
    return total;
  }

  async getAllOrders(userId?: number, status?: OrderStatus) {
    return await this.orderRepo.findAll(userId, status);
  }

  async getOrderById(id: number) {
    return await this.orderRepo.findById(id);
  }

  async deleteOrderById(id: number) {
    return await this.orderRepo.deleteById(id);
  }
}
