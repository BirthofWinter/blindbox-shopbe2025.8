import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Provide } from '@midwayjs/core';
import { BlindBox } from '../model/blindBox';

@Provide()
export class BlindBoxRepository {
  @InjectEntityModel(BlindBox)
  blindBoxModel: Repository<BlindBox>;

  // 创建盲盒
  async createBlindBox(blindBox: BlindBox): Promise<BlindBox> {
    return await this.blindBoxModel.save(blindBox);
  }

  // 获取所有盲盒
  async findAll(): Promise<BlindBox[]> {
    return await this.blindBoxModel.find();
  }

  // 通过 ID 获取盲盒
  async findById(id: number): Promise<BlindBox | null> {
    return await this.blindBoxModel.findOne({ where: { id } });
  }

  // 更新盲盒
  async updateBlindBox(id: number, updateData: Partial<BlindBox>): Promise<void> {
    await this.blindBoxModel.update(id, updateData);
  }

  // 删除盲盒
  async deleteBlindBox(id: number): Promise<void> {
    await this.blindBoxModel.delete(id);
  }
}
