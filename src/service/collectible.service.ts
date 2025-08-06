import { Provide, Inject } from '@midwayjs/core';
import { CollectibleRepository } from '../repository/collectible.repository';

@Provide()
export class CollectibleService {
  @Inject()
  collectibleRepo: CollectibleRepository;

  async create(type: string, name: string, ownerId: number) {
    return await this.collectibleRepo.createCollectible(type, name, ownerId);
  }

  async getAll() {
    return await this.collectibleRepo.findAll();
  }

  async getById(id: number) {
    return await this.collectibleRepo.findById(id);
  }

  async delete(id: number) {
    return await this.collectibleRepo.deleteById(id);
  }
}
