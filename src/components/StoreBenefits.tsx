export function StoreBenefits() {
  return (
    <section
      className="approach-section"
      id="our-approach"
      aria-label="ShopBoard at a glance"
    >
      <article className="approach-benefit">
        <span className="benefit-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M4 8h16l1 12H3L4 8Z" />
            <path d="M8 9V6a4 4 0 0 1 8 0v3" />
            <path d="m8 14 2.5 2.5L16 11" />
          </svg>
        </span>
        <h2>A thoughtful edit</h2>
        <p>Skincare for your everyday rituals.</p>
      </article>

      <article className="approach-benefit">
        <span className="benefit-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 3v3M12 18v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1" />
            <circle cx="12" cy="12" r="5" />
          </svg>
        </span>
        <h2>Easy to explore</h2>
        <p>Search and filter the local collection.</p>
      </article>

      <article className="approach-benefit">
        <span className="benefit-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 8h14l1 13H4L5 8Z" />
            <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            <path d="M8 14h8" />
          </svg>
        </span>
        <h2>Your bag, saved</h2>
        <p>Cart items stay on this device.</p>
      </article>

      <article className="approach-benefit">
        <span className="benefit-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M4.8 21a7.2 7.2 0 0 1 14.4 0" />
          </svg>
        </span>
        <h2>Account preview</h2>
        <p>Try the client-side registration form.</p>
      </article>
    </section>
  );
}
