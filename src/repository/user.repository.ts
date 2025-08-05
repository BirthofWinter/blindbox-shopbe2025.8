// src/repository/user.repository.ts
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Provide } from '@midwayjs/core';
import { User } from '../model/user';

@Provide()
export class UserRepository {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async findByNickname(nickname: string): Promise<User | null> {
    return await this.userModel.findOne({ where: { nickname } });
  }

  async saveUser(user: User): Promise<User> {
    return await this.userModel.save(user);
  }
}
