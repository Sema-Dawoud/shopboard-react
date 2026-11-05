import { useCallback, useEffect, useMemo, useState } from 'react';
import { AccountSection } from './components/AccountSection.js';
import { CartSection } from './components/CartSection.js';
import { CategorySection } from './components/CategorySection.js';
import { EditorialSection } from './components/EditorialSection.js';
import { FeaturedProducts } from './components/FeaturedProducts.js';
import { HeroSection } from './components/HeroSection.js';
import { ProductCollection } from './components/ProductCollection.js';
import { SiteFooter } from './components/SiteFooter.js';
import { SiteHeader } from './components/SiteHeader.js';
import { StoreBenefits } from './components/StoreBenefits.js';
import { ToastRegion } from './components/ToastRegion.js';
import type { ToastNotice, ToastType } from './components/ToastRegion.js';
import { ValuesStrip } from './components/ValuesStrip.js';
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  getCart,
  increaseQuantity,
  removeFromCart,
  setCartProducts,
} from './modules/cart/cart.state.js';
import { getCartCount, getCartTotal } from './modules/cart/cart.logic.js';
import { fetchProducts } from './modules/products/products.api.js';
import localProducts from './modules/products/products.data.js';
import {
  filterProducts,
  searchProducts,
  sortProducts,
} from './modules/products/products.logic.js';
import type {
  LoadState,
  Product,
  ProductCategoryFilter,
  ProductSortOrder,
} from './modules/products/products.types.js';

function App() {
  const [products, setProducts] = useState<Product[]>(localProducts);
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' });
  const [retryCount, setRetryCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<ProductCategoryFilter>('all');
  const [sortOrder, setSortOrder] = useState<ProductSortOrder>('default');
  const [toast, setToast] = useState<ToastNotice | null>(null);
  const [, setCartVersion] = useState(0);

  const refreshCart = useCallback(() => {
    setCartVersion((version) => version + 1);
  }, []);

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    let isActive = true;

    fetchProducts()
      .then((loadedProducts) => {
        if (!isActive) return;

        setProducts(loadedProducts);
        setCartProducts(loadedProducts);
        refreshCart();
        setLoadState({ status: 'success' });
      })
      .catch((error: unknown) => {
        if (!isActive) return;

        const message =
          error instanceof Error
            ? error.message
            : 'Products could not be loaded. Please try again.';
        setLoadState({ status: 'error', message });
        showToast(message, 'error');
      });

    return () => {
      isActive = false;
    };
  }, [retryCount, refreshCart, showToast]);

  const visibleProducts = useMemo(() => {
    const searched = searchProducts(products, searchTerm);
    const filtered = filterProducts(searched, category);

    return sortProducts(filtered, sortOrder);
  }, [category, products, searchTerm, sortOrder]);

  function handleAddToCart(productId: number): void {
    const product = products.find((item) => item.id === productId);
    addToCart(productId);
    refreshCart();

    if (product) showToast(`${product.name} added to your bag.`, 'success');
  }

  function handleRemoveFromCart(productId: number, productName: string): void {
    removeFromCart(productId);
    refreshCart();
    showToast(`${productName} removed from your bag.`, 'info');
  }

  function handleClearCart(): void {
    if (getCartCount() === 0) return;

    clearCart();
    refreshCart();
    showToast('Your bag has been emptied.', 'info');
  }

  function handleRetry(): void {
    setLoadState({ status: 'loading' });
    setRetryCount((count) => count + 1);
  }

  function handleClearFilters(): void {
    setSearchTerm('');
    setCategory('all');
    setSortOrder('default');
  }

  function increaseCartQuantity(productId: number): void {
    increaseQuantity(productId);
    refreshCart();
  }

  function decreaseCartQuantity(productId: number): void {
    decreaseQuantity(productId);
    refreshCart();
  }

  const cartItems = getCart();
  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  return (
    <>
      <SiteHeader
        cartCount={cartCount}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <main>
        <HeroSection />
        <div className="storefront-content">
          <StoreBenefits />
          <FeaturedProducts products={products} onAddToCart={handleAddToCart} />
          <EditorialSection />
          <ValuesStrip />
        </div>
        <CategorySection onSelectCategory={setCategory} />
        <ProductCollection
          products={visibleProducts}
          loadState={loadState}
          category={category}
          onCategoryChange={setCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onClearFilters={handleClearFilters}
          onRetry={handleRetry}
          onAddToCart={handleAddToCart}
        />
        <AccountSection />
        <CartSection
          items={cartItems}
          count={cartCount}
          total={cartTotal}
          onIncrease={increaseCartQuantity}
          onDecrease={decreaseCartQuantity}
          onRemove={handleRemoveFromCart}
          onClear={handleClearCart}
        />
      </main>
      <SiteFooter />
      <ToastRegion toast={toast} onDismiss={dismissToast} />
    </>
  );
}

export default App;
