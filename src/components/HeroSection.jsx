import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

function useCountdown(target) {
  const [diff, setDiff] = useState(target - Date.now());
  useEffect(() => {
    const interval = setInterval(() => setDiff(target - Date.now()), 1000);
    return () => clearInterval(interval);
  }, [target]);
  return useMemo(() => {
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  }, [diff]);
}

function ScrollIndicator() {
  const scrollToNext = () => {
    const next = document.getElementById("timeline");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      type="button"
      className="hero-scroll-indicator"
      onClick={scrollToNext}
      aria-label="Scroll to next section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <span className="hero-scroll-text">Scroll</span>
      <motion.span
        className="hero-scroll-arrow"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        ↓
      </motion.span>
    </motion.button>
  );
}

/**
 * Cinematic mobile-first hero section.
 * Keeps existing content, typography, and colors; adds full-screen layout,
 * gradient overlay, subtle animations, slow background zoom, and scroll indicator.
 */
export default function HeroSection({
  weddingDateLabel = "26 March 2026",
  weddingDateMs
}) {
  const target = weddingDateMs ?? new Date("2026-03-26T00:00:00+05:30").getTime();
  const countdown = useCountdown(target);

  return (
    <section className="home-hero" aria-label="Hero">
      <div className="home-hero-bg-wrap">
        <motion.div
          className="home-hero-bg"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 28, ease: "linear" }}
        />
      </div>
      <div className="home-hero-overlay" />
      <div className="home-hero-content">
        <motion.p
          className="home-hero-subtitle"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
        >
          Together with their families
        </motion.p>
        <motion.h1
          className="home-hero-names"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          Vatsal <span className="home-hero-amp">&</span> Vanshika
        </motion.h1>
        <motion.p
          className="home-hero-date"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.55 }}
        >
          {weddingDateLabel}
        </motion.p>
        <motion.div
          className="home-hero-countdown"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            { label: "Days", value: countdown.days },
            { label: "Hours", value: countdown.hours },
            { label: "Minutes", value: countdown.minutes },
            { label: "Seconds", value: countdown.seconds }
          ].map((item) => (
            <div key={item.label} className="home-countdown-item">
              <span className="home-countdown-value">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="home-countdown-label">{item.label}</span>
            </div>
          ))}
        </motion.div>
        <motion.p
          className="home-hero-credits"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.9 }}
        >
          Mandhania Family welcomes you · S/o Mrs. Aruna & Mr. Madhusudan Mandhania
          · D/o Mrs. Pooja & Mr. Rajesh Dhingra
        </motion.p>
      </div>
      <ScrollIndicator />

      <style>{`
        .home-hero {
          position: relative;
          height: 100vh;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        .home-hero-bg-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .home-hero-bg {
          position: absolute;
          inset: -5%;
          width: 110%;
          height: 110%;
          left: -5%;
          top: -5%;
          background-image: url(/photos/home-bg.jpg), linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #1a0a0a 100%);
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .home-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.25) 0%,
            rgba(0,0,0,0.5) 40%,
            rgba(0,0,0,0.65) 70%,
            rgba(0,0,0,0.75) 100%
          );
          pointer-events: none;
        }
        .home-hero-content {
          position: relative;
          z-index: 2;
          padding: 1.5rem 1.25rem 5rem;
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .home-hero-subtitle {
          font-family: "Poppins", sans-serif;
          font-size: clamp(0.7rem, 2.5vw, 0.75rem);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          margin: 0 0 0.75rem;
        }
        .home-hero-names {
          font-family: "Dancing Script", cursive;
          font-weight: 700;
          font-size: clamp(2.25rem, 12vw, 4.5rem);
          color: #fff;
          margin: 0 0 0.5rem;
          line-height: 1.15;
          text-shadow: 0 4px 24px rgba(0,0,0,0.4);
        }
        .home-hero-amp {
          display: inline-block;
          margin: 0 0.15em;
          color: var(--gold-light);
          font-weight: 700;
        }
        .home-hero-date {
          font-family: "Playfair Display", serif;
          font-size: clamp(1rem, 2.5vw, 1.1rem);
          letter-spacing: 0.2em;
          color: var(--gold-light);
          margin: 0 0 1.5rem;
        }
        .home-hero-countdown {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem 0.75rem;
          margin-bottom: 1.5rem;
        }
        .home-countdown-item {
          min-width: 56px;
          padding: 0.45rem 0.6rem;
          border-radius: 12px;
          background: rgba(10,4,4,0.6);
          border: 1px solid rgba(212,168,75,0.35);
          backdrop-filter: blur(8px);
        }
        .home-countdown-value {
          display: block;
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: clamp(1.15rem, 3vw, 1.35rem);
          color: var(--gold-light);
          text-shadow: 0 0 20px rgba(240,201,107,0.5);
        }
        .home-countdown-label {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
        }
        .home-hero-credits {
          font-family: "Playfair Display", serif;
          font-style: italic;
          font-size: clamp(0.7rem, 2vw, 0.8rem);
          color: rgba(255,255,255,0.6);
          margin: 0;
          line-height: 1.6;
          max-width: 100%;
          overflow-wrap: break-word;
        }
        .hero-scroll-indicator {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem;
          background: none;
          border: none;
          color: rgba(255,255,255,0.7);
          font-family: "Poppins", sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .hero-scroll-indicator:hover {
          color: var(--gold-light);
        }
        .hero-scroll-arrow {
          font-size: 1.1rem;
          line-height: 1;
        }
        @media (min-width: 768px) {
          .home-hero-content {
            padding: 6rem 2rem 5rem;
          }
          .home-hero-names {
            font-size: clamp(3rem, 8vw, 4.5rem);
          }
          .home-hero-countdown { gap: 0.75rem 1rem; margin-bottom: 2rem; }
          .home-countdown-item { min-width: 64px; padding: 0.5rem 0.75rem; }
        }
      `}</style>
    </section>
  );
}
