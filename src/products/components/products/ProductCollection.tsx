import type {
  LoadState,
  Product,
  ProductCategoryFilter,
  ProductSortOrder,
} from '../../products.types.js';
import { ProductCard } from './ProductCard.js';

interface ProductCollectionProps {
  products: Product[];
  categories: Product['category'][];
  loadState: LoadState;
  category: ProductCategoryFilter;
  onCategoryChange: (category: ProductCategoryFilter) => void;
  sortOrder: ProductSortOrder;
  onSortChange: (sortOrder: ProductSortOrder) => void;
  onClearFilters: () => void;
  onRetry: () => void;
  onAddToCart: (productId: number) => void;
}

export function ProductCollection({
  products,
  categories,
  loadState,
  category,
  onCategoryChange,
  sortOrder,
  onSortChange,
  onClearFilters,
  onRetry,
  onAddToCart,
}: ProductCollectionProps) {
  return (
    <section
      className="products-section page-section"
      id="full-collection"
      aria-labelledby="collection-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE FULL COLLECTION</p>
          <h2 id="collection-title">Find your everyday essential.</h2>
        </div>
        <p>Search, filter or browse at your own pace.</p>
      </div>

      <div className="product-toolbar">
        <div className="control-group">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            value={category}
            onChange={(event) => {
              const selectedCategory = event.currentTarget.value;
              const matchingCategory = categories.find(
                (productCategory) => productCategory === selectedCategory,
              );
              onCategoryChange(matchingCategory ?? 'all');
            }}
          >
            <option value="all">All categories</option>
            {categories.map((productCategory) => (
              <option key={productCategory} value={productCategory}>
                {productCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <label htmlFor="sort-select">Sort by</label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={(event) => {
              const selectedSort = event.currentTarget.value;
              const isPriceSort =
                selectedSort === 'low-high' || selectedSort === 'high-low';

              onSortChange(isPriceSort ? selectedSort : 'default');
            }}
          >
            <option value="default">Featured</option>
            <option value="low-high">Price: low to high</option>
            <option value="high-low">Price: high to low</option>
          </select>
        </div>
        <button
          className="clear-filters"
          type="button"
          onClick={onClearFilters}
        >
          Clear filters
        </button>
      </div>

      <div className="product-lists">
        <p className="result-count" aria-live="polite">
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
        {loadState.status === 'loading' && (
          <p className="products-status" role="status">
            Loading products… Your local favorites are ready to browse.
          </p>
        )}
        {loadState.status === 'error' && (
          <div className="products-status products-error" role="alert">
            <p>
              We could not refresh the online products. Your local favorites are
              still available. {loadState.message}
            </p>
            <button
              className="button button-primary"
              type="button"
              onClick={onRetry}
            >
              Try again
            </button>
          </div>
        )}
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <p className="empty-products">No products match your search.</p>
          )}
        </div>
      </div>
    </section>
  );
}
