import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User as User } from '../model/user';

export class UserRepository {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  /**
   * 创建用户
   * @param nickname 用户昵称
   * @param password 加密后的密码
   */
  async createUser(nickname: string, password: string): Promise<User> {
    const user = new User();
    user.nickname = nickname;
    user.password = password;
    return await this.userModel.save(user);
  }

  /**
   * 根据昵称查找用户
   * @param nickname 用户昵称
   */
  async findUserByNickname(nickname: string): Promise<User | null> {
    return await this.userModel.findOne({ where: { nickname } });
  }

  /**
   * 验证用户是否存在
   * @param nickname 用户昵称
   */
  async isUserExists(nickname: string): Promise<boolean> {
    const user = await this.findUserByNickname(nickname);
    return !!user;
  }
}