import { useState, type FormEvent } from 'react';
import skincareImage from '../../../assets/beauty/skincare-duo.jpg';

export function AccountSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      className="account-section page-section"
      id="register"
      aria-labelledby="register-title"
    >
      <div className="account-copy">
        <p className="eyebrow">A LITTLE SPACE OF YOUR OWN</p>
        <h2 id="register-title">Make yourself at home.</h2>
        <p>
          Create a ShopBoard account to start gathering your everyday beauty
          favourites. Account services are not connected in this preview.
        </p>
      </div>
      <div className="account-image" aria-hidden="true">
        <img src={skincareImage} alt="" loading="lazy" />
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="full-name">Full name</label>
          <input
            type="text"
            id="full-name"
            name="fullName"
            autoComplete="name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            minLength={8}
            autoComplete="new-password"
            required
          />
          <small>Use at least 8 characters.</small>
        </div>
        <button className="button button-primary" type="submit">
          Create account
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {submitted
            ? 'Your details are valid. Account creation will be available when account services are connected.'
            : ''}
        </p>
      </form>
    </section>
  );
}
