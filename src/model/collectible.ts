import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BlindBox } from './blindBox';

@Entity('collectibles')
export class Collectible {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => BlindBox)
  blindBox: BlindBox;
}
