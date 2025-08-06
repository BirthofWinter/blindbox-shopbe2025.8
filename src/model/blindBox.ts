// src/model/blindBox.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('blind_boxes') // 表名建议用复数
export class BlindBox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  price: number;

  @Column()
  type: string;
}
