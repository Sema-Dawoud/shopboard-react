import type { Product } from '../products/products.types.js';
import localProducts from '../products/products.data.js';
import type { Cart, CartItem, CartProduct } from './cart.types.js';

const STORAGE_KEY = 'shopboard-cart-v3';
const PRODUCTS_STORAGE_KEY = `${STORAGE_KEY}-products`;

let cart: Cart = loadStoredArray(STORAGE_KEY, isCartItem);
let products: Product[] = [
  ...localProducts,
  ...loadStoredArray(PRODUCTS_STORAGE_KEY, isProduct).filter(
    (savedProduct) =>
      !localProducts.some(
        (localProduct) => localProduct.id === savedProduct.id,
      ),
  ),
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isCartItem(value: unknown): value is CartItem {
  if (!isRecord(value)) return false;

  return (
    'id' in value &&
    typeof value.id === 'number' &&
    Number.isInteger(value.id) &&
    'quantity' in value &&
    typeof value.quantity === 'number' &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0
  );
}

function isProduct(value: unknown): value is Product {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === 'number' &&
    Number.isInteger(value.id) &&
    typeof value.name === 'string' &&
    value.category === 'Skincare' &&
    typeof value.price === 'number' &&
    Number.isFinite(value.price) &&
    typeof value.description === 'string' &&
    typeof value.image === 'string' &&
    typeof value.imageAlt === 'string' &&
    typeof value.inStock === 'boolean' &&
    typeof value.featured === 'boolean'
  );
}

function loadStoredArray<T>(
  storageKey: string,
  isValidItem: (value: unknown) => value is T,
): T[] {
  if (typeof window === 'undefined') return [];

  try {
    const savedItems = window.localStorage.getItem(storageKey);
    if (!savedItems) return [];

    const parsed: unknown = JSON.parse(savedItems);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item: unknown) => isValidItem(item));
  } catch {
    return [];
  }
}

function saveCart(): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    const cartProducts = products.filter((product) =>
      cart.some((item) => item.id === product.id),
    );
    window.localStorage.setItem(
      PRODUCTS_STORAGE_KEY,
      JSON.stringify(cartProducts),
    );
  } catch {
    // Keep the in-memory cart usable when browser storage is unavailable.
  }
}

export function getCart(): CartProduct[] {
  return cart.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);

    return product ? [{ ...product, quantity: item.quantity }] : [];
  });
}

export function getCartState(): readonly CartItem[] {
  return cart.map(({ id, quantity }) => ({ id, quantity }));
}

export function setCartProducts(loadedProducts: Product[]): void {
  products = [...loadedProducts];
  cart = cart.filter((item) =>
    products.some((product) => product.id === item.id && product.inStock),
  );
  saveCart();
}

export function addToCart(productId: number): void {
  const product = products.find((candidate) => candidate.id === productId);
  if (!product?.inStock) return;

  const item = cart.find((cartItem) => cartItem.id === productId);
  cart = item
    ? cart.map((cartItem) =>
        cartItem.id === productId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      )
    : [...cart, { id: productId, quantity: 1 }];

  saveCart();
}

export function increaseQuantity(productId: number): void {
  addToCart(productId);
}

export function decreaseQuantity(productId: number): void {
  const item = cart.find((cartItem) => cartItem.id === productId);
  if (!item) return;

  cart =
    item.quantity === 1
      ? cart.filter((cartItem) => cartItem.id !== productId)
      : cart.map((cartItem) =>
          cartItem.id === productId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        );

  saveCart();
}

export function removeFromCart(productId: number): void {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
}

export function clearCart(): void {
  cart = [];
  saveCart();
}
