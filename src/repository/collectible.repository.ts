import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Collectible } from '../model/collectible';

@Provide()
export class CollectibleRepository {
  @InjectEntityModel(Collectible)
  collectibleModel: Repository<Collectible>;

  async createCollectible(blindBoxId: number, name: string) {
    const collectible = this.collectibleModel.create({
      name,
      blindBox: { id: blindBoxId } as any,
    });
    return await this.collectibleModel.save(collectible);
  }

  async findAll() {
    return await this.collectibleModel.find({ relations: ['blindBox'] });
  }

  async findById(id: number) {
    return await this.collectibleModel.findOne({ where: { id }, relations: ['blindBox'] });
  }

  async deleteById(id: number) {
    return await this.collectibleModel.delete(id);
  }

  async findByBlindBox(blindBoxId: number) {
    return await this.collectibleModel.find({
      where: {
        blindBox: { id: blindBoxId }
      },
      relations: ['blindBox']
    });
  }
}
