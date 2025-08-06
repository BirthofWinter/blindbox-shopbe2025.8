import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-json')
  items: { blindBoxId: number; quantity: number }[];

  @Column('float')
  totalPrice: number;

  @ManyToOne(() => User)
  creator: User;
}
