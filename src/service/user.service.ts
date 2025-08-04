// src/service/user.service.ts
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user';
import * as bcrypt from 'bcrypt';

export class UserService {  
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  // 注册用户
  async register(nickname: string, password: string): Promise<string> {
    const existingUser = await this.userRepository.findOneBy({ nickname });
    if (existingUser) {
      return '用户已存在';
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建并保存用户
    const user = new User();
    user.nickname = nickname;
    user.password = hashedPassword;

    await this.userRepository.save(user);
    return '注册成功';
  }

  // 登录用户
  async login(nickname: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ nickname });
    if (!user) {
      return '用户不存在';
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return '密码错误';
    }

    return '登录成功';
  }
}
