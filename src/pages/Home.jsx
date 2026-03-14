import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Timeline from "../components/Timeline";
import LocationSection from "../components/LocationSection";
import { timelineEvents } from "../data/timelineEvents";

const WEDDING_DATE = new Date("2026-03-26T00:00:00+05:30").getTime();
const WEDDING_DATE_LABEL = "26 March 2026";

const PAISLEY_STAMP = `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 8c-6 4-12 14-12 24 0 8 4 14 10 18-2 6-2 12 0 18-4 2-8 2-12 0 0 6 4 12 10 14 6 4 14 4 20 0 6-2 10-8 10-14-4 2-8 2-12 0 2-6 2-12 0-18 6-4 10-10 10-18 0-10-6-20-12-24z' fill='%23D4AF37' opacity='0.12'/%3E%3Ccircle cx='40' cy='32' r='4' fill='%23D4AF37' opacity='0.12'/%3E%3C/svg%3E")`;
const FLORAL_CORNER_200 = `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 120 Q50 100 90 70 T150 20' stroke='%23D4AF37' stroke-width='1.8' fill='none' opacity='0.5'/%3E%3Cpath d='M30 160 Q80 140 120 100' stroke='%23D4AF37' stroke-width='1.4' fill='none' opacity='0.5'/%3E%3Cellipse cx='40' cy='110' rx='14' ry='8' fill='%23D4AF37' opacity='0.5'/%3E%3Cellipse cx='85' cy='65' rx='10' ry='6' fill='%23D4AF37' opacity='0.5'/%3E%3Ccircle cx='130' cy='35' r='5' fill='%23D4AF37' opacity='0.5'/%3E%3Cpath d='M60 140 Q70 120 85 100' stroke='%23D4AF37' stroke-width='1' fill='none' opacity='0.5'/%3E%3C/svg%3E")`;
const STAR_POSITIONS = [
  { left: "5%", top: "12%" }, { left: "92%", top: "8%" }, { left: "15%", top: "45%" }, { left: "88%", top: "38%" },
  { left: "8%", top: "78%" }, { left: "94%", top: "82%" }, { left: "48%", top: "22%" }, { left: "52%", top: "65%" },
  { left: "28%", top: "15%" }, { left: "72%", top: "72%" }, { left: "35%", top: "55%" }, { left: "65%", top: "18%" },
  { left: "18%", top: "62%" }, { left: "82%", top: "52%" }, { left: "42%", top: "88%" }, { left: "58%", top: "42%" }
];

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

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export default function Home() {
  const countdown = useCountdown(WEDDING_DATE);

  return (
    <motion.main
      className="page home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Full-width hero */}
      <section className="home-hero">
        <div className="home-hero-bg" />
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
            {WEDDING_DATE_LABEL}
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
                <span className="home-countdown-value">{String(item.value).padStart(2, "0")}</span>
                <span className="home-countdown-label">{item.label}</span>
              </div>
            ))}
          </motion.div>
          <motion.p
            className="home-hero-credits"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.9 }}
          >
            Mandhania Family welcomes you · S/o Mrs. Aruna & Mr. Madhusudan Mandhania · D/o Mrs. Pooja & Mr. Rajesh Dhingra
          </motion.p>
          <motion.button
            type="button"
            className="home-hero-scroll"
            aria-label="Scroll to next section"
            onClick={() => document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <span className="home-hero-scroll-text">Scroll</span>
            <span className="home-hero-scroll-arrow">↓</span>
          </motion.button>
        </div>
      </section>

      {/* Our Celebrations — romantic zigzag timeline with petals */}
      <section className="home-celebrations" id="timeline">
        <div className="home-celebrations-bg" aria-hidden="true" />
        <div className="home-celebrations-dots" aria-hidden="true" />
        <div className="home-celebrations-streaks" aria-hidden="true" />
        <div className="home-celebrations-paisley" style={{ backgroundImage: PAISLEY_STAMP }} aria-hidden="true" />
        <div className="home-celebrations-floral-corner home-celebrations-floral-tl" style={{ backgroundImage: FLORAL_CORNER_200 }} aria-hidden="true" />
        <div className="home-celebrations-floral-corner home-celebrations-floral-tr" style={{ backgroundImage: FLORAL_CORNER_200 }} aria-hidden="true" />
        <div className="home-celebrations-floral-corner home-celebrations-floral-bl" style={{ backgroundImage: FLORAL_CORNER_200 }} aria-hidden="true" />
        <div className="home-celebrations-floral-corner home-celebrations-floral-br" style={{ backgroundImage: FLORAL_CORNER_200 }} aria-hidden="true" />
        <div className="home-celebrations-stars" aria-hidden="true">
          {STAR_POSITIONS.map((pos, i) => (
            <span key={i} className="home-celebrations-star" style={{ left: pos.left, top: pos.top }}>✦</span>
          ))}
        </div>
        <div className="home-celebrations-petals" aria-hidden="true">
          {[...Array(40)].map((_, i) => {
            const left = (i / 39) * 100;
            const size = 5 + (i * 7) % 12;
            const duration = 8 + (i * 3) % 18;
            const opacity = 0.3 + ((i * 11) % 41) / 100;
            const shape = i % 3;
            const color = i % 2 === 0 ? "#e75480" : "#ffb6c1";
            return (
              <div
                key={i}
                className={`home-celebrations-petal home-celebrations-petal--shape-${shape}`}
                style={{
                  left: `${left}%`,
                  animationDelay: `${(i * 0.8) % 20}s`,
                  animationDuration: `${duration}s`,
                  width: `${size}px`,
                  height: shape === 0 ? `${size}px` : shape === 1 ? `${size * 1.4}px` : `${size * 1.1}px`,
                  opacity,
                  background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${color}, ${color}99)`
                }}
              />
            );
          })}
        </div>
        <div className="home-celebrations-inner">
          <motion.h2
            className="home-celebrations-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            Our Celebrations
          </motion.h2>
          <div className="home-celebrations-title-line" aria-hidden="true" />
          <p className="home-celebrations-intro">
            Join us at Stardom Resort, Jaisinghpura, Jaipur for every moment of our wedding.
          </p>
          <Timeline events={timelineEvents} />
          <motion.div
            className="home-gallery-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/gallery" className="home-gallery-link">View Gallery</Link>
          </motion.div>
        </div>
      </section>

      <LocationSection />

      <style>{`
        .home-page { min-height: 100vh; }
        .home-hero {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        .home-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url(/photos/home-bg.jpg), linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #1a0a0a 100%);
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .home-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.6) 100%);
          pointer-events: none;
        }
        .home-hero-content {
          position: relative;
          z-index: 2;
          padding: 5rem 1.5rem 4rem;
          max-width: 720px;
          margin: 0 auto;
        }
        .home-hero-subtitle {
          font-family: "Poppins", sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          margin: 0 0 0.75rem;
        }
        .home-hero-names {
          font-family: "Dancing Script", cursive;
          font-weight: 700;
          font-size: clamp(2.5rem, 10vw, 4.5rem);
          color: #fff;
          margin: 0 0 0.5rem;
          line-height: 1.15;
          text-shadow: 0 4px 24px rgba(0,0,0,0.4), 0 0 40px rgba(212,175,55,0.15);
        }
        .home-hero-amp {
          display: inline-block;
          margin: 0 0.15em;
          color: var(--gold-light);
          font-weight: 700;
        }
        .home-hero-date {
          font-family: "Playfair Display", serif;
          font-size: 1.1rem;
          letter-spacing: 0.2em;
          color: #D4AF37;
          margin: 0 0 2rem;
        }
        .home-hero-countdown {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem 1rem;
          margin-bottom: 2rem;
        }
        .home-countdown-item {
          min-width: 64px;
          padding: 0.5rem 0.75rem;
          border-radius: 12px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(212,168,75,0.35);
          backdrop-filter: blur(8px);
        }
        .home-countdown-value {
          display: block;
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 1.35rem;
          color: var(--gold-light);
          text-shadow: 0 0 20px rgba(240,201,107,0.5);
        }
        .home-countdown-label {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
        }
        .home-hero-credits {
          font-family: "Playfair Display", serif;
          font-style: italic;
          font-size: 0.8rem;
          color: #FFF8F0;
          margin: 0;
          line-height: 1.6;
        }
        .home-hero-scroll {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #D4AF37;
        }
        .home-hero-scroll-text {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .home-hero-scroll-arrow { font-size: 1rem; }
        .home-celebrations {
          position: relative;
          padding: 4rem 1rem 4.5rem;
          background: #FFFDF5;
          scroll-margin-top: 4rem;
          overflow-x: hidden;
          max-width: 100%;
        }
        .home-celebrations-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(ellipse 55% 50% at 0% 0%, rgba(255, 182, 193, 0.5) 0%, transparent 55%),
            radial-gradient(ellipse 50% 45% at 100% 0%, rgba(212, 175, 55, 0.5) 0%, transparent 50%),
            radial-gradient(ellipse 45% 45% at 0% 100%, rgba(255, 160, 122, 0.5) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 100% 100%, rgba(220, 120, 140, 0.45) 0%, transparent 52%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(255, 192, 203, 0.48) 0%, transparent 65%),
            radial-gradient(ellipse 35% 35% at 25% 30%, rgba(255, 182, 193, 0.45) 0%, transparent 55%),
            radial-gradient(ellipse 38% 38% at 75% 25%, rgba(212, 175, 55, 0.48) 0%, transparent 50%),
            radial-gradient(ellipse 32% 32% at 20% 75%, rgba(255, 160, 122, 0.47) 0%, transparent 50%),
            radial-gradient(ellipse 36% 36% at 80% 70%, rgba(220, 120, 140, 0.45) 0%, transparent 50%),
            radial-gradient(ellipse 28% 28% at 55% 15%, rgba(212, 175, 55, 0.45) 0%, transparent 55%),
            radial-gradient(ellipse 30% 30% at 40% 85%, rgba(255, 192, 203, 0.46) 0%, transparent 52%);
        }
        .home-celebrations-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: radial-gradient(circle, rgba(212, 175, 55, 0.08) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .home-celebrations-streaks {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255, 182, 193, 0.08) 60px, rgba(255, 182, 193, 0.08) 62px),
            repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(212, 175, 55, 0.08) 70px, rgba(212, 175, 55, 0.08) 72px);
        }
        .home-celebrations-paisley {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-repeat: repeat;
          background-size: 80px 80px;
        }
        .home-celebrations-floral-corner {
          position: absolute;
          width: 200px;
          height: 200px;
          pointer-events: none;
          z-index: 0;
          background-repeat: no-repeat;
          background-size: contain;
        }
        .home-celebrations-floral-tl { top: 0; left: 0; }
        .home-celebrations-floral-tr { top: 0; right: 0; transform: scaleX(-1); }
        .home-celebrations-floral-bl { bottom: 0; left: 0; transform: scaleY(-1); }
        .home-celebrations-floral-br { bottom: 0; right: 0; transform: scale(-1, -1); }
        .home-celebrations-stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .home-celebrations-star {
          position: absolute;
          font-size: 0.9rem;
          color: rgba(212, 175, 55, 0.3);
          transform: translate(-50%, -50%);
        }
        .home-celebrations-petals {
          position: absolute;
          inset: 0;
          left: 0;
          right: 0;
          width: 100%;
          max-width: 100%;
          pointer-events: none;
          overflow: hidden;
        }
        .home-celebrations-petal {
          position: absolute;
          top: -20px;
          animation: home-petal-fall linear infinite;
        }
        .home-celebrations-petal--shape-0 { border-radius: 50%; }
        .home-celebrations-petal--shape-1 { border-radius: 40% 60% 50% 50%; }
        .home-celebrations-petal--shape-2 { border-radius: 50% 30% 50% 40%; }
        @keyframes home-petal-fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        .home-celebrations-inner {
          position: relative;
          z-index: 3;
          max-width: 960px;
          margin: 0 auto;
        }
        .home-celebrations-title {
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C8860A;
          margin: 0 0 0.5rem;
          text-align: center;
        }
        .home-celebrations-title-line {
          width: 100px;
          height: 2px;
          margin: 0 auto 1.25rem;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
          opacity: 0.7;
        }
        .home-celebrations-intro {
          font-size: 0.9rem;
          color: #2D2D2D;
          opacity: 0.85;
          text-align: center;
          margin: 0 auto 2.5rem;
          max-width: 480px;
        }
        .home-gallery-cta { text-align: center; margin-top: 2.5rem; }
        .home-gallery-link {
          display: inline-block;
          padding: 0.6rem 1.5rem;
          border-radius: 999px;
          border: 1px solid var(--gold);
          color: var(--gold-light);
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .home-gallery-link:hover {
          background: rgba(212,168,75,0.2);
          color: #fff;
        }
        @media (min-width: 768px) {
          .home-hero-content { padding: 6rem 2rem 5rem; }
          .home-hero-names { font-size: clamp(3rem, 8vw, 4.5rem); }
          .home-celebrations { padding: 5rem 1.5rem 5rem; }
        }
      `}</style>
    </motion.main>
  );
}
