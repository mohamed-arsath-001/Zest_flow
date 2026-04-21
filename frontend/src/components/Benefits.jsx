import React, { useEffect, useRef, useState } from 'react';
import './Benefits.css';

const benefits = [
  {
    id: "01",
    headline: "Your Investment Works Harder Than You Do",
    body: "Every solution we build is tied to a real business outcome. We don't ship features — we deliver returns. If it doesn't move the needle, we don't build it.",
    tags: ["ROI Focused", "Strategic Value"],
    image: "/benefits/roi.png", // Replace with actual images or generated assets
    svg: (
      <svg className="benefit-svg-decorator" width="200" height="200" viewBox="0 0 200 200" style={{ top: '-50px', right: '-50px' }}>
        <path className="benefit-svg-path" d="M10,190 Q100,100 190,190" />
      </svg>
    )
  },
  {
    id: "02",
    headline: "Small Team. Unfair Advantage.",
    body: "AI doesn't replace your people — it multiplies them. The right system lets a team of 5 operate like a team of 50. That's the leverage we build for you.",
    tags: ["Efficiency", "Scalability", "AI Multiplier"],
    image: "/benefits/leverage.png",
    svg: (
      <svg className="benefit-svg-decorator" width="200" height="200" viewBox="0 0 200 200" style={{ bottom: '-50px', left: '-50px' }}>
        <rect className="benefit-svg-path" x="20" y="20" width="160" height="160" rx="20" />
      </svg>
    )
  },
  {
    id: "03",
    headline: "We Don't Disappear After Launch",
    body: "Most agencies hand over the keys and vanish. We stay. As your business grows and changes, we evolve your systems with you — not just fix bugs, but push you forward.",
    tags: ["Longevity", "Growth", "Partnership"],
    image: "/benefits/support.png",
    svg: (
      <svg className="benefit-svg-decorator" width="240" height="100" viewBox="0 0 240 100" style={{ top: '40%', left: '-80px' }}>
        <path className="benefit-svg-path" d="M0,50 C60,50 60,10 120,10 C180,10 180,90 240,90" />
      </svg>
    )
  },
  {
    id: "04",
    headline: "Plugs In. Doesn't Break Things.",
    body: "No months of onboarding. No ripping out what already works. We build around your existing stack so your team hits the ground running from day one.",
    tags: ["Seamless", "Integration", "Native"],
    image: "/benefits/execution.png",
    svg: (
      <svg className="benefit-svg-decorator" width="200" height="200" viewBox="0 0 200 200" style={{ bottom: '20px', right: '40px' }}>
        <circle className="benefit-svg-path" cx="100" cy="100" r="80" strokeDasharray="5,5" />
      </svg>
    )
  }
];

const Counter = ({ target, isVisible }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      let start = 0;
      const end = parseInt(target);
      const duration = 1500;
      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const p = Math.min(progress / duration, 1);
        const easeOutQuad = (t) => t * (2 - t);
        
        setCount(Math.floor(easeOutQuad(p) * end));
        
        if (p < 1) {
          requestAnimationFrame(animate);
        } else {
          hasAnimated.current = true;
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isVisible, target]);

  return <span>{count.toString().padStart(2, '0')}</span>;
};

const BenefitRow = ({ benefit, index, scrollProgress }) => {
  const rowRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 1;

  return (
    <div 
      ref={rowRef} 
      className={`benefit-row ${isEven ? 'benefit-row--reverse' : ''}`}
    >
      {benefit.svg}

      <div 
        className={`benefit-content ${isVisible ? 'animate-magnetic' : ''}`}
        style={{ '--slide-offset': isEven ? '150px' : '-150px' }}
      >
        <div className="benefit-number">
          <Counter target={benefit.id} isVisible={isVisible} />
        </div>
        
        <h2 className="benefit-headline">{benefit.headline}</h2>
        <p className="benefit-body">{benefit.body}</p>
        
        <div className="benefit-tags">
          {benefit.tags.map((tag, i) => (
            <span 
              key={tag} 
              className={`benefit-tag ${isVisible ? 'animate-pop' : ''}`}
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={`benefit-visual ${isVisible ? 'animate-sweep' : ''}`}>
        <div 
          className={`benefit-visual-inner ${isVisible ? 'animate-wipe' : ''}`}
          style={{ backgroundImage: `url(${benefit.image})` }}
        />
        {isVisible && benefit.svg.props.children.props.className === "benefit-svg-path" && (
           /* Trigger SVG draw by adding class */
           null
        )}
      </div>

      {/* Manual SVG draw class injection */}
      {useEffect(() => {
        if (isVisible && rowRef.current) {
          const paths = rowRef.current.querySelectorAll('.benefit-svg-path');
          paths.forEach(p => p.classList.add('animate-draw'));
        }
      }, [isVisible])}
    </div>
  );
};

const Benefits = () => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrollPos = -rect.top;
      const viewHeight = window.innerHeight;
      
      const p = Math.min(Math.max(scrollPos / (sectionHeight - viewHeight), 0), 1);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="benefits-section" id="benefits">
      <div className="benefits-progress-line">
        <div 
          className="benefits-progress-fill" 
          style={{ transform: `scaleY(${progress})` }}
        />
      </div>

      {benefits.map((benefit, i) => (
        <BenefitRow 
          key={benefit.id} 
          benefit={benefit} 
          index={i} 
        />
      ))}
    </section>
  );
};

export default Benefits;
