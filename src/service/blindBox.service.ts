// src/service/blindBox.service.ts
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Provide } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { BlindBox } from '../model/blindBox';

@Provide()
export class BlindBoxService {
  @InjectEntityModel(BlindBox)
  blindBoxRepository: Repository<BlindBox>;

  async create(price: number, type: string): Promise<BlindBox> {
    const blindBox = new BlindBox();
    blindBox.price = price;
    blindBox.type = type;
    return await this.blindBoxRepository.save(blindBox);
  }

  async findAll(): Promise<BlindBox[]> {
    return await this.blindBoxRepository.find();
  }

  async findById(id: number): Promise<BlindBox | null> {
    return await this.blindBoxRepository.findOneBy({ id });
  }

  async update(id: number, data: Partial<BlindBox>): Promise<string> {
    await this.blindBoxRepository.update(id, data);
    return '更新成功';
  }

  async delete(id: number): Promise<string> {
    await this.blindBoxRepository.delete(id);
    return '删除成功';
  }
}
