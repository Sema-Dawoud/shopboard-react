import { EditorialSection } from '../home/components/home/EditorialSection.js';
import { StoreBenefits } from '../home/components/home/StoreBenefits.js';
import { ValuesStrip } from '../home/components/home/ValuesStrip.js';

export default function AboutPage() {
  return (
    <>
      <section className="page-section" aria-labelledby="about-title">
        <p className="eyebrow">OUR APPROACH</p>
        <h1 id="about-title">Make room for you.</h1>
        <p>
          ShopBoard brings together thoughtful skincare for the small rituals
          that make an everyday routine feel like your own.
        </p>
      </section>
      <StoreBenefits />
      <EditorialSection />
      <ValuesStrip />
    </>
  );
}
