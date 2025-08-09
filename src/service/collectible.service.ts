import { Provide, Inject } from '@midwayjs/core';
import { CollectibleRepository } from '../repository/collectible.repository';

@Provide()
export class CollectibleService {
  @Inject()
  collectibleRepo: CollectibleRepository;

  async create(blindBoxId: number, name: string) {
    const collectible = await this.collectibleRepo.createCollectible(blindBoxId, name);
    return await this.collectibleRepo.findById(collectible.id);
  }

  async getRandomCollectible(blindBoxId: number) {
    const collectibles = await this.collectibleRepo.findByBlindBox(blindBoxId);
    if (!collectibles || collectibles.length === 0) {
      throw new Error(`No collectibles found for blind box ${blindBoxId}`);
    }
    const randomIndex = Math.floor(Math.random() * collectibles.length);
    return collectibles[randomIndex];
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

  async findByBlindBox(blindBoxId: number) {
    return await this.collectibleRepo.findByBlindBox(blindBoxId);
  }
}
