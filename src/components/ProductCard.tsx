import { formatPrice } from '../shared/utils/format-price.js';
import type { Product } from '../modules/products/products.types.js';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          className="product-image"
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
        />
        <span className="product-category-label">{product.category}</span>
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-purchase-row">
          <span className="price">{formatPrice(product.price)}</span>
          <button
            className="add-to-cart"
            type="button"
            aria-label={`Add ${product.name} to shopping bag`}
            disabled={!product.inStock}
            onClick={() => onAddToCart(product.id)}
          >
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}
