import { useEffect, useState, type ReactNode } from 'react';
import { useCartStore } from '../cart/cart.store.js';
import { fetchProducts } from './products.api.js';
import localProducts from './products.data.js';
import type { LoadState, Product } from './products.types.js';
import { ProductsContext } from './products-context.js';

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(localProducts);
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' });
  const [retryCount, setRetryCount] = useState(0);
  const synchronizeItems = useCartStore((state) => state.synchronizeItems);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    fetchProducts(controller.signal)
      .then((loadedProducts) => {
        if (!isActive) return;

        setProducts(loadedProducts);
        synchronizeItems(loadedProducts);
        setLoadState({ status: 'success' });
      })
      .catch((error: unknown) => {
        if (
          !isActive ||
          controller.signal.aborted ||
          (error instanceof Error && error.name === 'AbortError')
        ) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : 'Products could not be loaded. Please try again.';
        setLoadState({ status: 'error', message });
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [retryCount, synchronizeItems]);

  function retry(): void {
    setLoadState({ status: 'loading' });
    setRetryCount((count) => count + 1);
  }

  return (
    <ProductsContext.Provider value={{ products, loadState, retry }}>
      {children}
    </ProductsContext.Provider>
  );
}
