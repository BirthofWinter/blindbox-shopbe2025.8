import { Provide, Inject } from '@midwayjs/core';
import { UserService } from './user.service';

@Provide()
export class DisplayService {
  @Inject()
  userService: UserService;

  async setDisplay(userId: number, collectibleId: number, position: number): Promise<void> {
    // 验证位置是否有效
    if (position !== 1 && position !== 2) {
      throw new Error('展示位置必须是1或2');
    }

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new Error('用户不存在');
    }

    // 验证收藏品是否属于用户
    const hasCollectible = user.collectibles.some(c => c.id === collectibleId);
    if (!hasCollectible) {
      throw new Error('该收藏品不属于此用户');
    }

    // 初始化displayItems数组（如果为空）
    if (!user.displayItems) {
      user.displayItems = [];
    }

    // 移除现有的展示位置（如果有）
    user.displayItems = user.displayItems.filter(item => item.position !== position);

    // 添加新的展示项
    user.displayItems.push({
      collectibleId,
      position
    });

    // 更新用户信息
    await this.userService.updateDisplayItems(userId, user.displayItems);
  }

  async removeDisplay(userId: number, position: number): Promise<void> {
    if (position !== 1 && position !== 2) {
      throw new Error('展示位置必须是1或2');
    }

    const user = await this.userService.findById(userId);
    if (!user || !user.displayItems) {
      return;
    }

    // 移除指定位置的展示项
    user.displayItems = user.displayItems.filter(item => item.position !== position);
    await this.userService.updateDisplayItems(userId, user.displayItems);
  }

  async getUserDisplays(userId: number): Promise<any[]> {
    const user = await this.userService.findById(userId);
    if (!user || !user.displayItems) {
      return [];
    }

    // 返回展示项及其对应的收藏品信息
    return user.displayItems.map(item => ({
      position: item.position,
      collectible: user.collectibles.find(c => c.id === item.collectibleId)
    }));
  }
}