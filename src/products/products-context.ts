import { createContext } from 'react';
import type { LoadState, Product } from './products.types.js';

export interface ProductsContextValue {
  products: Product[];
  loadState: LoadState;
  retry: () => void;
}

export const ProductsContext = createContext<ProductsContextValue | null>(null);
