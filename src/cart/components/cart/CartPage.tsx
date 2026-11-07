import { useToast } from '../../../app/useToast.js';
import { useCartStore } from '../../cart.store.js';
import type { CartProduct } from '../../cart.types.js';
import { useProducts } from '../../../products/useProducts.js';
import { CartSection } from './CartSection.js';

export default function CartPage() {
  const { products } = useProducts();
  const itemsById = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const { showToast } = useToast();

  const items: CartProduct[] = itemsById.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return product ? [{ ...product, quantity: item.quantity }] : [];
  });
  const count = itemsById.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  function handleRemove(productId: number, productName: string): void {
    removeItem(productId);
    showToast(`${productName} removed from your bag.`, 'info');
  }

  function handleClear(): void {
    if (count === 0) return;
    clearCart();
    showToast('Your bag has been emptied.', 'info');
  }

  return (
    <CartSection
      items={items}
      count={count}
      total={total}
      onIncrease={(productId) => increaseQuantity(productId, products)}
      onDecrease={decreaseQuantity}
      onRemove={handleRemove}
      onClear={handleClear}
    />
  );
}
