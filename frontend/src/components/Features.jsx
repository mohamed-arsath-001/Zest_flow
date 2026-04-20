import { useEffect, useRef } from "react";
import "./Features.css";

const services = [
  {
    num: "01",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="3" fill="#ff3b2e"/>
        <circle cx="14" cy="4"  r="2" fill="#ff3b2e" opacity="0.6"/>
        <circle cx="14" cy="24" r="2" fill="#ff3b2e" opacity="0.6"/>
        <circle cx="4"  cy="14" r="2" fill="#ff3b2e" opacity="0.6"/>
        <circle cx="24" cy="14" r="2" fill="#ff3b2e" opacity="0.6"/>
        <line x1="14" y1="7"  x2="14" y2="11" stroke="#ff3b2e" strokeWidth="1" opacity="0.5"/>
        <line x1="14" y1="17" x2="14" y2="21" stroke="#ff3b2e" strokeWidth="1" opacity="0.5"/>
        <line x1="7"  y1="14" x2="11" y2="14" stroke="#ff3b2e" strokeWidth="1" opacity="0.5"/>
        <line x1="17" y1="14" x2="21" y2="14" stroke="#ff3b2e" strokeWidth="1" opacity="0.5"/>
      </svg>
    ),
    title: "AI Technical Advisory",
    description: "Guiding businesses through every stage of AI adoption with expert technical direction.",
    tags: ["AI Roadmap Planning", "AI Stack Consultation"],
    image: "/services/card1.png",
  },
  {
    num: "02",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="7" height="7" rx="1" stroke="#ff3b2e" strokeWidth="1.5" fill="none"/>
        <rect x="15" y="6" width="7" height="7" rx="1" stroke="#ff3b2e" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <rect x="6" y="15" width="7" height="7" rx="1" stroke="#ff3b2e" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <rect x="15" y="15" width="7" height="7" rx="1" stroke="#ff3b2e" strokeWidth="1.5" fill="none" opacity="0.4"/>
        <circle cx="14" cy="14" r="1.5" fill="#ff3b2e"/>
      </svg>
    ),
    title: "Bespoke AI Systems",
    description: "Building purpose-built AI systems that streamline, automate and elevate your core operations.",
    tags: ["Workflow Automation", "Process Intelligence"],
    image: "/services/card2.png",
  },
  {
    num: "03",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="14" cy="14" rx="4" ry="11" stroke="#ff3b2e" strokeWidth="1.5" fill="none"/>
        <ellipse cx="14" cy="14" rx="11" ry="4" stroke="#ff3b2e" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <circle cx="14" cy="14" r="2.5" fill="#ff3b2e"/>
        <ellipse cx="14" cy="14" rx="8" ry="8" stroke="#ff3b2e" strokeWidth="1" strokeDasharray="2 3" fill="none" opacity="0.35"/>
      </svg>
    ),
    title: "AI Consulting",
    description: "Strategic AI partnerships that turn complexity into competitive advantage.",
    tags: ["AI Strategy & Advisory", "Bespoke AI Implementation"],
    image: "/services/card3.png",
  },
];

const Features = () => {
  const sectionRef    = useRef(null);
  const stickyRef     = useRef(null);
  const cardRefs      = useRef([]);
  const spotlightRef  = useRef(null);
  const labelRef      = useRef(null);
  const titleRef      = useRef(null);
  const lineRefs      = useRef([]);

  // ── Intersection Observer — entrance animations ──────────
  useEffect(() => {
    // 1. Section Fade-in + Spotlight + Header elements
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px"
    };

    const mainObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // A. Section Fade-in
          sectionRef.current?.classList.add("fv-section-visible");
          
          // B. Spotlight Expand (Radial light)
          spotlightRef.current?.classList.add("spotlight-active");
          
          // C. Eyebrow "WHAT WE DO" fades up (0.2s delay)
          setTimeout(() => labelRef.current?.classList.add("fv-visible"), 400);
          
          // D. Main title curtain reveal (0.4s delay)
          setTimeout(() => titleRef.current?.classList.add("fv-visible"), 600);

          // E. Description fade up (0.6s delay)
          const desc = sectionRef.current?.querySelector(".features-description");
          setTimeout(() => desc?.classList.add("fv-visible"), 800);

          // F. Cards staggered entrance (on wrappers)
          const wrappers = sectionRef.current?.querySelectorAll(".feature-card-wrapper");
          wrappers?.forEach((wrapper, i) => {
            const delay = 300 + i * 200;
            setTimeout(() => wrapper.classList.add("fv-card-in"), delay);
          });

          // G. Vertical lines draw
          lineRefs.current.forEach((line, i) => {
            const delay = 500 + i * 200;
            setTimeout(() => line?.classList.add("fv-line-draw"), delay);
          });

          mainObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (stickyRef.current) mainObserver.observe(stickyRef.current);

    return () => mainObserver.disconnect();
  }, []);

  // ── Scroll-scrubbed card stacking (desktop only) ─────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const isMobile = () => window.innerWidth <= 768;

    let rafId = null;
    let lastScrollY = -1;

    const update = () => {
      const scrollY = window.scrollY;
      if (scrollY === lastScrollY) { rafId = null; return; }
      lastScrollY = scrollY;

      if (isMobile()) { rafId = null; return; }

      const rect = section.getBoundingClientRect();
      const sectionTop = -rect.top;
      const totalScroll = rect.height - window.innerHeight;
      const numCards = services.length;
      const scrollPerCard = totalScroll / numCards;

      services.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;

        if (i === 0) {
          const progress = Math.min(Math.max(sectionTop / scrollPerCard, 0), 1);
          const scale = 1 - progress * 0.06;
          const brightness = 1 - progress * 0.35;
          card.style.transform = `scale(${scale})`;
          card.style.filter = `brightness(${brightness})`;
          return;
        }

        const startScroll = (i - 1) * scrollPerCard;
        const endScroll   = i * scrollPerCard;
        const rawProgress = (sectionTop - startScroll) / (endScroll - startScroll);
        const slideProgress = Math.min(Math.max(rawProgress, 0), 1);
        const eased = 1 - Math.pow(1 - slideProgress, 3);
        const translateY = (1 - eased) * 100;

        if (i < numCards - 1) {
          const nextProgress = Math.min(
            Math.max((sectionTop - i * scrollPerCard) / scrollPerCard, 0), 1
          );
          const scale      = 1 - nextProgress * 0.06;
          const brightness = 1 - nextProgress * 0.35;
          card.style.transform = `translateY(${translateY}%) scale(${scale})`;
          card.style.filter    = `brightness(${brightness})`;
        } else {
          card.style.transform = `translateY(${translateY}%)`;
          card.style.filter    = "";
        }
      });

      rafId = null;
    };

    const onScroll = () => { if (!rafId) rafId = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // initial paint

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="features-section"
      id="features"
      data-testid="features-section"
    >
      {/* ── Cinematic Spotlight Glow ────────────────────── */}
      <div
        ref={spotlightRef}
        className="features-spotlight"
        aria-hidden="true"
      />

      {/* ── Sticky viewport ──────────────────────────────── */}
      <div ref={stickyRef} className="features-sticky">

        {/* ── Section header ───────────────────────────── */}
        <div className="features-header">
          <div className="features-header__grid">
            <div className="features-header__left">
              {/* Eyebrow — fades up first */}
              <p ref={labelRef} className="features-label fv-label">
                WHAT WE DO
              </p>

              {/* Main title — curtain reveal */}
              <div className="features-title-clip">
                <h2 ref={titleRef} className="features-title fv-title">
                  Our Services
                </h2>
              </div>
            </div>

            <div className="features-header__right">
              <p className="features-description fv-label" style={{ transitionDelay: "0.6s" }}>
                We blend technical precision with creative intuition to build AI solutions that don't just work—they inspire. From roadmap planning to bespoke system architecture.
              </p>
            </div>
          </div>
        </div>

        {/* ── Card stack ───────────────────────────────── */}
        <div className="features-stack">
          {services.map((s, i) => (
            <div key={`wrap-${s.num}`} className="feature-card-wrapper">
              <article
                ref={(el) => (cardRefs.current[i] = el)}
                className={`feature-card feature-card--${i + 1} fv-card-init`}
                data-testid={`feature-card-${i + 1}`}
                style={i > 0 ? { transform: "translateY(100%)" } : {}}
              >
                {/* Red top border sweep */}
                <div className="feature-card__top-sweep" aria-hidden="true" />

                {/* Left: text content */}
                <div className="feature-card__content">
                  <div className="feature-card__icon" aria-hidden="true">
                    {s.icon}
                  </div>
                  <span className="feature-card__num" aria-hidden="true">
                    {s.num}
                  </span>
                  <h3 className="feature-card__title">{s.title}</h3>
                  <p className="feature-card__desc">{s.description}</p>
                  <div className="feature-card__tags">
                    {s.tags.map((tag) => (
                      <span key={tag} className="feature-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Right: atmospheric image */}
                <div className="feature-card__visual">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="feature-card__img"
                    draggable={false}
                  />
                  <div className="feature-card__visual-overlay" aria-hidden="true" />
                </div>
              </article>

              {/* Vertical Divider (between cards) */}
              {i < services.length - 1 && (
                <div 
                  ref={(el) => (lineRefs.current[i] = el)}
                  className="features-vertical-line" 
                  aria-hidden="true" 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
