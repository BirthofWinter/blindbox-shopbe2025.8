
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Collectible } from './collectible';

interface DisplayItem {
  collectibleId: number;
  position: number; // 1 或 2
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // 添加唯一约束
  nickname: string;

  @Column()
  password: string;

  @Column('decimal', { default: 500 })
  balance: number;

  @ManyToMany(() => Collectible)
  @JoinTable()
  collectibles: Collectible[];

  @Column('simple-json', { nullable: true })
  displayItems: DisplayItem[];
}
