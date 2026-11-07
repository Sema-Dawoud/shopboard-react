import type { Product } from '../../products.types.js';
import { ProductCard } from './ProductCard.js';
import { Link } from 'react-router-dom';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
}

export function FeaturedProducts({
  products,
  onAddToCart,
}: FeaturedProductsProps) {
  const featuredProducts = [
    ...products.filter((product) => product.featured),
    ...products.filter((product) => !product.featured),
  ].slice(0, 5);

  return (
    <section
      className="favorites-section page-section"
      id="favorites"
      aria-labelledby="products-title"
    >
      <div className="section-heading products-heading">
        <div>
          <p className="eyebrow">THE EVERYDAY EDIT</p>
          <h2 id="products-title">Shop Our Favorites</h2>
        </div>
        <Link className="text-link" to="/shop">
          View all products <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="product-grid featured-grid">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
