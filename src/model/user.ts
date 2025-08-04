
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // 自增主键
  id: number;

  @Column() // 昵称字段
  nickname: string;

  @Column() // 密码字段
  password: string;
}
