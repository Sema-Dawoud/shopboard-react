import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Product } from '../products/products.types.js';
import type { CartItem } from './cart.types.js';

const STORAGE_KEY = 'shopboard-cart-v3';

interface CartStore {
  items: CartItem[];
  addToCart: (productId: number, products: readonly Product[]) => boolean;
  increaseQuantity: (
    productId: number,
    products: readonly Product[],
  ) => boolean;
  decreaseQuantity: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  synchronizeItems: (products: readonly Product[]) => void;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isCartItem(value: unknown): value is CartItem {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === 'number' &&
    Number.isInteger(value.id) &&
    typeof value.quantity === 'number' &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0
  );
}

function parseCartItems(value: unknown): CartItem[] {
  return Array.isArray(value) ? value.filter(isCartItem) : [];
}

const compatibleStorage = createJSONStorage<{ items: CartItem[] }>(() => ({
  getItem(name) {
    try {
      const storedValue = window.localStorage.getItem(name);
      if (!storedValue) return null;

      const parsed: unknown = JSON.parse(storedValue);
      if (Array.isArray(parsed)) {
        return JSON.stringify({
          state: { items: parseCartItems(parsed) },
          version: 0,
        });
      }
      return storedValue;
    } catch {
      return null;
    }
  },
  setItem(name, value) {
    window.localStorage.setItem(name, value);
  },
  removeItem(name) {
    window.localStorage.removeItem(name);
  },
}));

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (productId, products) => {
        const product = products.find(
          (candidate) => candidate.id === productId,
        );
        if (!product?.inStock) return false;

        const item = get().items.find(
          (candidate) => candidate.id === productId,
        );
        set((state) => ({
          items: item
            ? state.items.map((candidate) =>
                candidate.id === productId
                  ? { ...candidate, quantity: candidate.quantity + 1 }
                  : candidate,
              )
            : [...state.items, { id: productId, quantity: 1 }],
        }));
        return true;
      },
      increaseQuantity: (productId, products) =>
        get().addToCart(productId, products),
      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.flatMap((item) =>
            item.id !== productId
              ? [item]
              : item.quantity > 1
                ? [{ ...item, quantity: item.quantity - 1 }]
                : [],
          ),
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      clearCart: () => set({ items: [] }),
      synchronizeItems: (products) =>
        set((state) => ({
          items: state.items.filter((item) =>
            products.some(
              (product) => product.id === item.id && product.inStock,
            ),
          ),
        })),
    }),
    {
      name: STORAGE_KEY,
      storage: compatibleStorage,
      version: 1,
      partialize: (state) => ({ items: state.items }),
      migrate: (persistedState) => {
        if (Array.isArray(persistedState)) {
          return { items: parseCartItems(persistedState) };
        }

        if (isRecord(persistedState)) {
          return { items: parseCartItems(persistedState.items) };
        }

        return { items: [] };
      },
      merge: (persistedState, currentState) => ({
        ...currentState,
        items: isRecord(persistedState)
          ? parseCartItems(persistedState.items)
          : [],
      }),
    },
  ),
);
