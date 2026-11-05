import skincareImage from '../assets/beauty/skincare-duo.jpg';
import type { ProductCategoryFilter } from '../modules/products/products.types.js';

interface CategorySectionProps {
  onSelectCategory: (category: ProductCategoryFilter) => void;
}

export function CategorySection({ onSelectCategory }: CategorySectionProps) {
  return (
    <section
      className="category-section page-section"
      id="categories"
      aria-labelledby="categories-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">FIND YOUR FEEL-GOOD</p>
          <h2 id="categories-title">A good place to begin.</h2>
        </div>
        <p>Skincare, thoughtfully gathered for your everyday.</p>
      </div>

      <div className="category-grid">
        <a
          className="category-card category-skincare"
          href="#full-collection"
          onClick={() => onSelectCategory('Skincare')}
        >
          <img
            src={skincareImage}
            alt="Skincare oils and creams on a stone counter"
            loading="lazy"
          />
          <span className="category-card-copy">
            <span>01 / CARE</span>
            <strong>Skincare</strong>
            <span className="category-arrow" aria-hidden="true">
              ↗
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
