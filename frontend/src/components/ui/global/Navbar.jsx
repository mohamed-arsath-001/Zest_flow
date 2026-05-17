import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`global-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Left: Logo/Brand */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">ZestTea</Link>
        </div>

        {/* Center: Links */}
        <nav className="navbar-center">
          <Link to="/about" className="navbar-link">Studio</Link>
          <Link to="/services" className="navbar-link">Work</Link>
          <Link to="/blogs" className="navbar-link">Contact</Link>
        </nav>

        {/* Right: Socials */}
        <div className="navbar-right">
          <a href="#" className="navbar-social">IG</a>
          <a href="#" className="navbar-social">LI</a>
          <a href="#" className="navbar-social">YT</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
