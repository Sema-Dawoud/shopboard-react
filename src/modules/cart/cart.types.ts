import type { Product } from '../products/products.types.js';

export interface CartItem {
  id: number;
  quantity: number;
}

export type Cart = CartItem[];

export type CartProduct = Product & { quantity: number };
