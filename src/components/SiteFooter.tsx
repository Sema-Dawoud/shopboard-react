import { BrandLogo } from './BrandLogo.js';

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
          <a href="#categories">Categories</a>
          <a href="#favorites">The beauty edit</a>
          <a href="#our-approach">Our approach</a>
        </nav>
        <nav className="footer-links" aria-label="Your ShopBoard">
          <h2>Your ShopBoard</h2>
          <a href="#register">Create an account</a>
          <a href="#cart">Shopping bag</a>
          <a href="#search-input">Find a product</a>
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
