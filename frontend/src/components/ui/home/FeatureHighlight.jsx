import React from 'react';
import './FeatureHighlight.css';

const FeatureHighlight = () => {
  return (
    <section className="feature-highlight">
      <div className="feature-highlight-container">
        <div className="feature-highlight-content">
          <h2 className="feature-highlight-headline">Built for Businesses That Move Fast</h2>
          <p className="feature-highlight-body">
            We combine technical depth with strategic thinking to deliver AI solutions that are practical, scalable and built to last.
          </p>
        </div>
        <div className="feature-highlight-graphic">
          <svg className="animated-graphic" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="var(--accent)" strokeWidth="1" strokeDasharray="5 5" className="spin-slow" />
            <circle cx="50" cy="50" r="30" stroke="var(--white)" strokeWidth="0.5" className="spin-fast-reverse" />
            <circle cx="50" cy="50" r="20" fill="var(--accent)" opacity="0.1" className="pulse" />
            <path d="M50 35 L65 65 L35 65 Z" stroke="var(--white)" strokeWidth="1" className="float-anim" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlight;
