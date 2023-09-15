export interface Cans {
  blue: number;
  green: number;
  orange: number;
}

export interface User {
  key: string;
  name: string;
  phone: string;
  coins: number;
  cans: Cans;
}
