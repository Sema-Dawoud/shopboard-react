import { BrandLogo } from './BrandLogo.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface SiteHeaderProps {
  cartCount: number;
}

export function SiteHeader({ cartCount }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchTerm =
    location.pathname === '/shop'
      ? (new URLSearchParams(location.search).get('q') ?? '')
      : '';

  function handleSearchChange(value: string): void {
    const search = value ? `?q=${encodeURIComponent(value)}` : '';
    navigate({ pathname: '/shop', search });
  }

  return (
    <>
      <div className="announcement-bar">
        <p>A little more care in every day.</p>
      </div>

      <header className={`site-header${isMenuOpen ? ' menu-open' : ''}`}>
        <BrandLogo />

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={
            isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {isMenuOpen ? (
              <path d="m6 6 12 12M18 6 6 18" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>

        <nav
          className={`primary-nav${isMenuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <Link
            className="mobile-only-nav-link"
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
            Shop All
          </Link>
          <Link to="/#favorites" onClick={() => setIsMenuOpen(false)}>
            Featured
          </Link>
          <Link to="/#categories" onClick={() => setIsMenuOpen(false)}>
            Categories
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            Our approach
          </Link>
          <Link to="/#register" onClick={() => setIsMenuOpen(false)}>
            Account
          </Link>
          <Link
            className="mobile-only-nav-link"
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
          >
            Shopping bag ({cartCount})
          </Link>
          <Link
            className="mobile-only-nav-link"
            to="/checkout"
            onClick={() => setIsMenuOpen(false)}
          >
            Checkout
          </Link>
        </nav>

        <div className="product-search control-group header-search">
          <label className="visually-hidden" htmlFor="search-input">
            Search products
          </label>
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
              onChange={(event) =>
                handleSearchChange(event.currentTarget.value)
              }
            />
          </div>
        </div>

        <div className="header-actions" aria-label="Shop actions">
          <Link
            className="icon-link cart-link"
            to="/cart"
            aria-label={`Shopping bag, items: ${cartCount}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 8h14l1 13H4L5 8Z" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>
            <span className="cart-count">{cartCount}</span>
          </Link>
          <Link className="icon-link" to="/#register" aria-label="Your account">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4.8 21a7.2 7.2 0 0 1 14.4 0" />
            </svg>
          </Link>
        </div>
      </header>
    </>
  );
}
