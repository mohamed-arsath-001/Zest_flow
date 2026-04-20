import React, { useEffect, useRef, useState } from "react";
import InfinityMirror from "@/components/InfinityMirror";

/**
 * Hero — "BORN TO CREATE"
 *
 * Scroll-exit animations added:
 *  - Portrait stage parallax (0.3x scroll)
 *  - Headline + Together fade-out over first 300px scroll
 */
const Hero = () => {
  const [lang, setLang] = useState("EN");
  const [animated, setAnimated] = useState(false);

  const heroRef       = useRef(null);
  const headlineRef   = useRef(null);
  const togetherRef   = useRef(null);
  const stageRef      = useRef(null);

  // ── Entry animation trigger ──────────────────────────────
  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // ── Scroll-exit animations ───────────────────────────────
  useEffect(() => {
    let rafId = null;
    let lastScrollY = -1;

    const update = () => {
      const scrollY = window.scrollY;
      if (scrollY === lastScrollY) { rafId = null; return; }
      lastScrollY = scrollY;

      const hero = heroRef.current;
      if (!hero) { rafId = null; return; }
      const heroH = hero.offsetHeight;

      // Only apply while hero is still in view
      if (scrollY > heroH) { rafId = null; return; }

      // 1. Headline fade-out: 1→0 over first 300px of scroll
      const headline = headlineRef.current;
      if (headline) {
        const op = Math.max(0, 1 - scrollY / 300);
        headline.style.opacity = op;
        headline.style.transform = `translateY(${scrollY * -0.08}px)`;
      }

      // 2. Together fade-out: 1→0 over first 380px
      const together = togetherRef.current;
      if (together) {
        const op = Math.max(0, 1 - scrollY / 380);
        together.style.opacity = op;
      }

      // 3. Stage parallax: moves upward at 0.3x scroll speed
      //    → translateY(+scrollY * 0.3) so it lags behind the page scroll
      const stage = stageRef.current;
      if (stage) {
        stage.style.transform = `translateX(-50%) translateY(${scrollY * 0.3}px)`;
        stage.style.willChange = "transform";
      }

      rafId = null;
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      data-testid="hero-section"
      className={`hero ${animated ? "is-animated" : ""}`}
    >
      {/* Step 1 — Top red bar sweep */}
      <div className="hero-topbar" aria-hidden="true" />

      {/* Radial vignette */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* Step 3 — Navbar */}
      <header
        data-testid="hero-nav"
        className="hero-nav anim-fade-down"
        style={{ animationDelay: "0.9s" }}
      >
        <div className="hero-nav__grid">
          <div className="hero-nav__logo-wrap">
            <a href="#" data-testid="hero-logo" aria-label="Future Three" className="hero-nav__logo">
              FUTURE<br />THREE<sup className="hero-nav__r">®</sup>
            </a>
          </div>

          <nav aria-label="Primary" className="hero-nav__center">
            <ul>
              <li><a href="#studio" data-testid="nav-studio" className="nav-link">Studio,</a></li>
              <li><a href="#work"   data-testid="nav-work"   className="nav-link">Work,</a></li>
              <li><a href="#contact" data-testid="nav-contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>

          <div className="hero-nav__right">
            <div data-testid="lang-switcher" className="hero-lang">
              <button type="button" onClick={() => setLang("EN")}
                className={lang === "EN" ? "is-active" : ""} aria-pressed={lang === "EN"}>
                <span className="hero-lang__dot" aria-hidden="true" />English
              </button>
              <button type="button" onClick={() => setLang("DE")}
                className={lang === "DE" ? "is-active" : ""} aria-pressed={lang === "DE"}>
                <span className="hero-lang__dot" aria-hidden="true" />Deutsch
              </button>
            </div>
            <ul className="hero-socials">
              <li><a href="#ig" data-testid="social-ig" className="nav-link">IG,</a></li>
              <li><a href="#li" data-testid="social-li" className="nav-link">LI,</a></li>
              <li><a href="#yt" data-testid="social-yt" className="nav-link">YT</a></li>
            </ul>
          </div>
        </div>
      </header>

      {/* Step 2 — "BORN TO CREATE" — scroll-exit: fades + lifts out */}
      <div ref={headlineRef} className="hero-headline-wrap" aria-hidden="true">
        <h1 data-testid="hero-headline" className="hero-headline">
          <span className="hero-word anim-curtain" style={{ animationDelay: "0.2s" }}>Born</span>
          <span className="hero-word-space"> </span>
          <span className="hero-word anim-curtain" style={{ animationDelay: "0.5s" }}>to</span>
          <span className="hero-word-space"> </span>
          <span className="hero-word anim-curtain" style={{ animationDelay: "0.8s" }}>Create</span>
        </h1>
      </div>

      {/* Bottom-left Consulting Button */}
      <button className="btn hero-btn anim-fade-up" style={{ animationDelay: "2.4s" }}>
        Book a consulting
      </button>

      {/* Centered stage — two people side-by-side (parallax wrapper) */}
      <div ref={stageRef} className="hero-stage">

        {/* Left person: Mohamed Arsath */}
        <figure
          data-testid="portrait-arsath"
          className="portrait portrait--left anim-float"
          style={{ "--rise-delay": "1.1s", "--float-delay": "3.0s" }}
        >
          <img
            src="/people/mohamed.png"
            alt="Mohamed Arsath"
            draggable={false}
            className="portrait__img"
          />
          <figcaption
            className="portrait-tag portrait-tag--left anim-fade-up"
            style={{ animationDelay: "1.9s" }}
          >
            <div className="portrait-tag__name">Mohamed Arsath</div>
            <div className="portrait-tag__role">Co-Founder · Creative Lead</div>
          </figcaption>
        </figure>

        {/* Right person: Jeswin Prabagaran */}
        <figure
          data-testid="portrait-jeswin"
          className="portrait portrait--right anim-float"
          style={{ "--rise-delay": "1.4s", "--float-delay": "3.0s" }}
        >
          <img
            src="/people/jeswin.png"
            alt="Jeswin Prabagaran"
            draggable={false}
            className="portrait__img"
          />
          <figcaption
            className="portrait-tag portrait-tag--right anim-fade-up"
            style={{ animationDelay: "2.1s" }}
          >
            <div className="portrait-tag__name">Jeswin Prabagaran</div>
            <div className="portrait-tag__role">Co-Founder · Technical Lead</div>
          </figcaption>
        </figure>
      </div>

      {/* Step 6 — "Together" typewriter — scroll-exit: fades out */}
      <div ref={togetherRef} data-testid="hero-together" className="together">
        <div className="together__line-wrap">
          <div className="together__line anim-line-grow" aria-hidden="true" />
        </div>
        <span className="together__word anim-typewriter" style={{ animationDelay: "2.8s" }}>Together</span>
      </div>
    </section>
  );
};

export default Hero;
