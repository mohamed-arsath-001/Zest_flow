import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const ServicesPage = () => {
  return (
    <div className="page-container pt-32">
      <div className="content-wrapper">
        <h1 className="page-title">Our Services</h1>
        <p className="page-subtitle">Comprehensive AI solutions for your business needs.</p>

        <div className="placeholder-section">
          <h2>What We Offer</h2>
          <div className="placeholder-grid">
            <Link to="/services/ai-integration" className="placeholder-box link-box">
              <h3>AI Integration</h3>
              <p>Seamlessly integrate AI into your existing workflows.</p>
            </Link>
            <Link to="/services/custom-models" className="placeholder-box link-box">
              <h3>Custom Models</h3>
              <p>Bespoke AI models trained on your data.</p>
            </Link>
            <Link to="/services/consulting" className="placeholder-box link-box">
              <h3>Consulting</h3>
              <p>Expert guidance on your AI strategy.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
