import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="global-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="footer-logo">ZestTea</h2>
            <p className="footer-tagline">AI Automation Boutique</p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <h3 className="footer-heading">Navigation</h3>
              <Link to="/about" className="footer-link">Studio</Link>
              <Link to="/services" className="footer-link">Work</Link>
              <Link to="/blogs" className="footer-link">Contact</Link>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Social</h3>
              <a href="#" className="footer-link">Instagram</a>
              <a href="#" className="footer-link">LinkedIn</a>
              <a href="#" className="footer-link">YouTube</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} ZestTea. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
