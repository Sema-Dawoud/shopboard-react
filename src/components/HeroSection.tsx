import heroImage from '../assets/beauty/skincare-hero.jpg';

export function HeroSection() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">SKINCARE &amp; LITTLE RITUALS</p>
        <h1 id="hero-title">
          Thoughtful care.
          <br />
          Beautiful <em>every day.</em>
        </h1>
        <p className="hero-description">
          Considered skincare for your everyday rituals.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#full-collection">
            Shop the collection
          </a>
          <a className="text-link" href="#categories">
            Explore categories <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hero-values" aria-label="Shop skincare">
          <a href="#categories">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4C11 4 5 7 5 14c0 3 2 5 5 5 7 0 10-6 10-15Z" />
              <path d="M3 21c3-5 7-8 13-11" />
            </svg>
            <span>Skincare</span>
          </a>
        </div>
      </div>

      <div className="hero-image-wrap">
        <img
          className="hero-image"
          src={heroImage}
          alt="A gentle facial cleanser and hydrating serum arranged in warm natural light"
          fetchPriority="high"
        />
        <div className="hero-image-index" aria-label="ShopBoard Beauty">
          SHOPBOARD
          <br />
          BEAUTY
        </div>
      </div>
    </section>
  );
}
