import { getCart, getCartState } from './cart.state.js';

export function getCartCount(): number {
  return getCartState().reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal(): number {
  return getCart().reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );
}
