import React from 'react';
import './SupportOrbitAnimation.css';

const supportPillars = [
  { 
    icon: (
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
        <circle cx='16' cy='16' r='12' stroke='#c8102e' strokeWidth='1.5'/>
        <polyline points='16,8 16,16 21,19' stroke='#c8102e' strokeWidth='1.5' strokeLinecap='round'/>
      </svg>
    ), 
    title: "24/7 Monitoring", 
    bio: "Always watching, always ready" 
  },
  { 
    icon: (
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
        <path d='M6 16 A10 10 0 1 1 16 26' stroke='#c8102e' strokeWidth='1.5' strokeLinecap='round'/>
        <polyline points='6,22 6,16 12,16' stroke='#c8102e' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
      </svg>
    ), 
    title: "Continuous Updates", 
    bio: "Evolving with your business" 
  },
  { 
    icon: (
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
        <path d='M16 4 L26 8 L26 16 C26 22 16 28 16 28 C16 28 6 22 6 16 L6 8 Z' stroke='#c8102e' strokeWidth='1.5' strokeLinejoin='round'/>
        <polyline points='11,16 14,19 21,13' stroke='#c8102e' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
      </svg>
    ), 
    title: "System Security", 
    bio: "Protecting what we built together" 
  },
  { 
    icon: (
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
        <polyline points='4,24 10,16 16,20 22,10 28,14' stroke='#c8102e' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
        <circle cx='28' cy='14' r='2' fill='#c8102e'/>
      </svg>
    ), 
    title: "Performance Tuning", 
    bio: "Pushing your systems forward" 
  },
  { 
    icon: (
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
        <path d='M16 6 C10 6 6 10 6 15 C6 20 10 23 16 26 C22 23 26 20 26 15 C26 10 22 6 16 6Z' stroke='#c8102e' strokeWidth='1.5'/>
        <line x1='16' y1='12' x2='16' y2='20' stroke='#c8102e' strokeWidth='1.5' strokeLinecap='round'/>
        <line x1='12' y1='16' x2='20' y2='16' stroke='#c8102e' strokeWidth='1.5' strokeLinecap='round'/>
      </svg>
    ), 
    title: "Dedicated Support", 
    bio: "A partner not just a vendor" 
  }
];

const SupportOrbitAnimation = () => {
  return (
    <div className="support-orbit-container">
      <div className="section-wrapper">
        <div className="orbit-center"></div>
        <ul className="support-cards" style={{ "--nth-siblings": 4 }}>
          {supportPillars.map((pillar, index) => (
            <li className="support-card" key={index} style={{ "--nth-child": index + 1 }}>
              <div className="support-avatar-link-wrapper">
                <div className="support-visual">
                  <div className="icon-visual">{pillar.icon}</div>
                </div>
                <div className="support-tooltiptext">
                  <h3 className="team-name">{pillar.title}</h3>
                  <div className="team-content-wrapper">
                    <p className="team-title">{pillar.title}</p>
                    <p className="team-bio">{pillar.bio}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SupportOrbitAnimation;
