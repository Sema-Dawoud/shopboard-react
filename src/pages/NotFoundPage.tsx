import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="page-section">
      <p className="eyebrow">404 — PAGE NOT FOUND</p>
      <h1>Looks like this page wandered off.</h1>
      <p>Let’s find something lovely for your everyday.</p>
      <Link className="button button-primary" to="/">
        Back to home
      </Link>
    </section>
  );
}
