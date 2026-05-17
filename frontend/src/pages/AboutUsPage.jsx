import React from 'react';
import './PageStyles.css';

const AboutUsPage = () => {
  return (
    <div className="page-container pt-32">
      <div className="content-wrapper">
        <h1 className="page-title">About Us</h1>
        <p className="page-subtitle">Pioneering AI integration for modern businesses.</p>

        <div className="placeholder-section">
          <h2>Our Story</h2>
          <p>We combine technical depth with strategic thinking to deliver AI solutions that are practical, scalable and built to last. Our journey started with a simple vision: to make AI accessible and actionable for businesses of all sizes.</p>
        </div>

        <div className="placeholder-section">
          <h2>Timeline</h2>
          <p>2020: Founded<br/>2021: First major platform release<br/>2023: Expanded to global markets</p>
        </div>

        <div className="placeholder-section">
          <h2>Our Team</h2>
          <p>Meet the experts behind the magic.</p>
          <div className="placeholder-grid">
            <div className="placeholder-box">Team Member 1</div>
            <div className="placeholder-box">Team Member 2</div>
            <div className="placeholder-box">Team Member 3</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUsPage;
