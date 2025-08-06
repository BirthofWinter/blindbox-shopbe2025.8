import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Collectible } from '../model/collectible';

@Provide()
export class CollectibleRepository {
  @InjectEntityModel(Collectible)
  collectibleModel: Repository<Collectible>;

  async createCollectible(type: string, name: string, ownerId: number) {
    const collectible = this.collectibleModel.create({
      type,
      name,
      owner: { id: ownerId } as any,
    });
    return await this.collectibleModel.save(collectible);
  }

  async findAll() {
    return await this.collectibleModel.find({ relations: ['owner'] });
  }

  async findById(id: number) {
    return await this.collectibleModel.findOne({ where: { id }, relations: ['owner'] });
  }

  async deleteById(id: number) {
    return await this.collectibleModel.delete(id);
  }
}
