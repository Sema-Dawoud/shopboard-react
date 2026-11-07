import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '../../../app/useToast.js';
import { ProductCollection } from './ProductCollection.js';
import { useCartStore } from '../../../cart/cart.store.js';
import {
  filterProducts,
  getProductCategories,
  searchProducts,
  sortProducts,
} from '../../products.logic.js';
import { useProducts } from '../../useProducts.js';
import type {
  ProductCategoryFilter,
  ProductSortOrder,
} from '../../products.types.js';

export default function ShopPage() {
  const { products, loadState, retry } = useProducts();
  const categories = getProductCategories(products);
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState<ProductCategoryFilter>(
    searchParams.get('category') === 'Skincare' ? 'Skincare' : 'all',
  );
  const [sortOrder, setSortOrder] = useState<ProductSortOrder>('default');
  const addToCart = useCartStore((state) => state.addToCart);
  const { showToast } = useToast();
  const searchTerm = searchParams.get('q') ?? '';
  const searched = searchProducts(products, searchTerm);
  const filtered = filterProducts(searched, category);
  const visibleProducts = sortProducts(filtered, sortOrder);

  function handleAddToCart(productId: number): void {
    const product = products.find((item) => item.id === productId);
    if (product && addToCart(productId, products)) {
      showToast(`${product.name} added to your bag.`, 'success');
    }
  }

  function clearFilters(): void {
    setCategory('all');
    setSortOrder('default');
  }

  return (
    <ProductCollection
      products={visibleProducts}
      categories={categories}
      loadState={loadState}
      category={category}
      onCategoryChange={setCategory}
      sortOrder={sortOrder}
      onSortChange={setSortOrder}
      onClearFilters={clearFilters}
      onRetry={retry}
      onAddToCart={handleAddToCart}
    />
  );
}
