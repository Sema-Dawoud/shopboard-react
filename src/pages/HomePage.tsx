import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AccountSection } from '../home/components/home/AccountSection.js';
import { CategorySection } from '../home/components/home/CategorySection.js';
import { EditorialSection } from '../home/components/home/EditorialSection.js';
import { FeaturedProducts } from '../products/components/products/FeaturedProducts.js';
import { HeroSection } from '../home/components/home/HeroSection.js';
import { StoreBenefits } from '../home/components/home/StoreBenefits.js';
import { ValuesStrip } from '../home/components/home/ValuesStrip.js';
import { useToast } from '../app/useToast.js';
import { useCartStore } from '../cart/cart.store.js';
import { useProducts } from '../products/useProducts.js';

export default function HomePage() {
  const location = useLocation();
  const { products } = useProducts();
  const addToCart = useCartStore((state) => state.addToCart);
  const { showToast } = useToast();

  useEffect(() => {
    const targetId = location.hash.slice(1);
    if (targetId) document.getElementById(targetId)?.scrollIntoView();
  }, [location.hash]);

  function handleAddToCart(productId: number): void {
    const product = products.find((item) => item.id === productId);
    if (product && addToCart(productId, products)) {
      showToast(`${product.name} added to your bag.`, 'success');
    }
  }

  return (
    <>
      <HeroSection />
      <div className="storefront-content">
        <StoreBenefits />
        <FeaturedProducts products={products} onAddToCart={handleAddToCart} />
        <EditorialSection />
        <ValuesStrip />
      </div>
      <CategorySection />
      <AccountSection />
    </>
  );
}
