import React from 'react';
import './SupportOrbitAnimation.css';

const supportPillars = [
  { icon: "⚙️", title: "24/7 Monitoring", bio: "Always watching, always ready" },
  { icon: "🔄", title: "Continuous Updates", bio: "Evolving with your business" },
  { icon: "🛡️", title: "System Security", bio: "Protecting what we built together" },
  { icon: "📈", title: "Performance Tuning", bio: "Pushing your systems forward" },
  { icon: "🤝", title: "Dedicated Support", bio: "A partner not just a vendor" }
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
