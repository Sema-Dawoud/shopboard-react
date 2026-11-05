import { BrandLogo } from './BrandLogo.js';

interface SiteHeaderProps {
  cartCount: number;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

export function SiteHeader({
  cartCount,
  searchTerm,
  onSearchChange,
}: SiteHeaderProps) {
  return (
    <>
      <div className="announcement-bar">
        <p>A little more care in every day.</p>
      </div>

      <header className="site-header">
        <BrandLogo />

        <nav className="primary-nav" aria-label="Main navigation">
          <a href="#full-collection">Shop All</a>
          <a href="#favorites">Featured</a>
          <a href="#categories">Categories</a>
          <a href="#our-approach">Our approach</a>
          <a href="#register">Account</a>
        </nav>

        <div className="product-search control-group header-search">
          <label htmlFor="search-input">Search products</label>
          <div className="search-field">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.5 4.5" />
            </svg>
            <input
              type="search"
              id="search-input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(event) => onSearchChange(event.currentTarget.value)}
            />
          </div>
        </div>

        <div className="header-actions" aria-label="Shop actions">
          <a
            className="icon-link cart-link"
            href="#cart"
            aria-label={`Shopping bag, items: ${cartCount}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 8h14l1 13H4L5 8Z" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>
            <span className="cart-count">{cartCount}</span>
          </a>
          <a className="icon-link" href="#register" aria-label="Your account">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4.8 21a7.2 7.2 0 0 1 14.4 0" />
            </svg>
          </a>
        </div>
      </header>
    </>
  );
}
