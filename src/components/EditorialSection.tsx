import skincareImage from '../assets/beauty/skincare-duo.jpg';

export function EditorialSection() {
  return (
    <section className="editorial-panel" aria-label="A note from ShopBoard">
      <div className="editorial-copy">
        <p className="eyebrow">THE SHOPBOARD CIRCLE</p>
        <h2>Make yourself at home.</h2>
        <p>
          Create a ShopBoard account to gather your everyday beauty favourites.
          Account services are not connected in this preview.
        </p>
        <a className="button button-primary" href="#register">
          Create an account
        </a>
      </div>
      <div className="editorial-image">
        <img
          src={skincareImage}
          alt="ShopBoard skincare essentials arranged on a stone surface"
          loading="lazy"
        />
      </div>
      <blockquote>
        <span aria-hidden="true">“</span>
        <p>
          Care for your skin.
          <br />
          Make room for you.
        </p>
        <cite>A NOTE FROM SHOPBOARD</cite>
      </blockquote>
    </section>
  );
}
