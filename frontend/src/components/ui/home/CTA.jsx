import React from 'react';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-headline">Ready to Build Something That Works?</h2>
        <p className="cta-subtext">
          Let's talk about your business and how AI can move the needle.
        </p>
        <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="cta-button">
          Book a Consultation
        </a>
      </div>
    </section>
  );
};

export default CTA;
