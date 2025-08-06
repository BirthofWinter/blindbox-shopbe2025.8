import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user';
import { Provide } from '@midwayjs/core';
import * as bcrypt from 'bcrypt';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userRepository: Repository<User>;

  async register(nickname: string, password: string): Promise<string> {
    console.log('是否获取到userRepository:', this.userRepository?.metadata);
    console.log('userRepository:', this.userRepository);

    const existingUser = await this.userRepository.findOneBy({ nickname });
    if (existingUser) {
      return '用户已存在';
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.nickname = nickname;
    user.password = hashedPassword;
    await this.userRepository.save(user);
    return '注册成功';
  }

  async login(nickname: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ nickname });
    if (!user) return '用户不存在';
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? '登录成功' : '密码错误';
  }
}
