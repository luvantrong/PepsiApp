import { GiftOfMe } from "./GiftOfMe";

export interface Cans {
  blue: number;
  green: number;
  orange: number;
}

export interface Turn {
  free: number;
  exchange: number;
}

export interface User {
  key: string;
  name: string;
  phone: string;
  coins: number;
  cans: Cans;
  turn: Turn;
  giftOfMe: GiftOfMe[];
}
