import { BrandLogo } from './BrandLogo.js';
import { Link } from 'react-router-dom';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <BrandLogo className="footer-logo" />
          <p>A thoughtful beauty edit for the rituals that make a day yours.</p>
        </div>
        <nav className="footer-links" aria-label="Explore">
          <h2>Explore</h2>
          <Link to="/shop?category=Skincare">Categories</Link>
          <Link to="/">The beauty edit</Link>
          <Link to="/about">Our approach</Link>
        </nav>
        <nav className="footer-links" aria-label="Your ShopBoard">
          <h2>Your ShopBoard</h2>
          <Link to="/#register">Create an account</Link>
          <Link to="/cart">Shopping bag</Link>
          <Link to="/shop">Find a product</Link>
        </nav>
        <div className="footer-note">
          <span>TAKE A MOMENT</span>
          <p>
            Care for your skin.
            <br />
            Make room for you.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 ShopBoard Beauty</span>
        <span>Made for your everyday.</span>
      </div>
    </footer>
  );
}
