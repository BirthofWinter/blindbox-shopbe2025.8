// src/interface/collectible.interface.ts

export interface CollectiblePoolItem {
  name: string;
  probability: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}