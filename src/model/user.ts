
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // 明确指定表名
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // 添加唯一约束
  nickname: string;

  @Column()
  password: string;


}
