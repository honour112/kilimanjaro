
export type Language = 'sw' | 'en';

export interface Product {
  id: string;
  name: { sw: string; en: string };
  price: number;
  description: { sw: string; en: string };
  image: string;
  category: { sw: string; en: string };
  compatibility?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export enum Page {
  HOME = 'home',
  SHOP = 'shop',
  ABOUT = 'about',
  DELIVERY = 'delivery',
  CONTACT = 'contact',
  CHECKOUT = 'checkout'
}
