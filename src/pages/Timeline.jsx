import React from "react";
import { motion } from "framer-motion";
import Timeline from "../components/Timeline";
import { timelineEvents } from "../data/timelineEvents";

const PAISLEY_STAMP = `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 8c-6 4-12 14-12 24 0 8 4 14 10 18-2 6-2 12 0 18-4 2-8 2-12 0 0 6 4 12 10 14 6 4 14 4 20 0 6-2 10-8 10-14-4 2-8 2-12 0 2-6 2-12 0-18 6-4 10-10 10-18 0-10-6-20-12-24z' fill='%23D4AF37' opacity='0.12'/%3E%3Ccircle cx='40' cy='32' r='4' fill='%23D4AF37' opacity='0.12'/%3E%3C/svg%3E")`;

const FLORAL_CORNER_200 = `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 120 Q50 100 90 70 T150 20' stroke='%23D4AF37' stroke-width='1.8' fill='none' opacity='0.5'/%3E%3Cpath d='M30 160 Q80 140 120 100' stroke='%23D4AF37' stroke-width='1.4' fill='none' opacity='0.5'/%3E%3Cellipse cx='40' cy='110' rx='14' ry='8' fill='%23D4AF37' opacity='0.5'/%3E%3Cellipse cx='85' cy='65' rx='10' ry='6' fill='%23D4AF37' opacity='0.5'/%3E%3Ccircle cx='130' cy='35' r='5' fill='%23D4AF37' opacity='0.5'/%3E%3Cpath d='M60 140 Q70 120 85 100' stroke='%23D4AF37' stroke-width='1' fill='none' opacity='0.5'/%3E%3C/svg%3E")`;

const STAR_POSITIONS = [
  { left: "5%", top: "12%" }, { left: "92%", top: "8%" }, { left: "15%", top: "45%" }, { left: "88%", top: "38%" },
  { left: "8%", top: "78%" }, { left: "94%", top: "82%" }, { left: "48%", top: "22%" }, { left: "52%", top: "65%" },
  { left: "28%", top: "15%" }, { left: "72%", top: "72%" }, { left: "35%", top: "55%" }, { left: "65%", top: "18%" },
  { left: "18%", top: "62%" }, { left: "82%", top: "52%" }, { left: "42%", top: "88%" }, { left: "58%", top: "42%" }
];

export default function TimelinePage() {
  return (
    <motion.main
      className="page timeline-page timeline-page--romantic"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Watercolor blobs — 8+ at different positions, more visible (0.45–0.55) */}
      <div className="timeline-page-bg" aria-hidden="true" />
      {/* Dot grid */}
      <div className="timeline-page-dots" aria-hidden="true" />
      {/* Diagonal streaks — 45°, pink and gold */}
      <div className="timeline-page-streaks" aria-hidden="true" />
      {/* Repeating paisley/mandala stamp */}
      <div className="timeline-page-paisley" style={{ backgroundImage: PAISLEY_STAMP }} aria-hidden="true" />
      {/* Large floral corners — 200px, gold 0.5 */}
      <div className="timeline-page-floral-corner timeline-page-floral-tl" style={{ backgroundImage: FLORAL_CORNER_200 }} aria-hidden="true" />
      <div className="timeline-page-floral-corner timeline-page-floral-tr" style={{ backgroundImage: FLORAL_CORNER_200 }} aria-hidden="true" />
      <div className="timeline-page-floral-corner timeline-page-floral-bl" style={{ backgroundImage: FLORAL_CORNER_200 }} aria-hidden="true" />
      <div className="timeline-page-floral-corner timeline-page-floral-br" style={{ backgroundImage: FLORAL_CORNER_200 }} aria-hidden="true" />
      {/* Scattered stars ✦ */}
      <div className="timeline-page-stars" aria-hidden="true">
        {STAR_POSITIONS.map((pos, i) => (
          <span key={i} className="timeline-page-star" style={{ left: pos.left, top: pos.top }}>✦</span>
        ))}
      </div>

      {/* Falling rose petals — 40, varied size/speed/opacity/shape/color */}
      <div className="timeline-petals" aria-hidden="true">
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
              className={`timeline-petal timeline-petal--shape-${shape}`}
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

      <div className="timeline-page-inner">
        <header className="timeline-page-header">
          <p className="timeline-page-label">Our Wedding</p>
          <h1 className="timeline-page-title">Timeline</h1>
          <p className="timeline-page-intro">
            All events in chronological order — Stardom Resort, Jaisinghpura, Jaipur
          </p>
        </header>
        <Timeline events={timelineEvents} />
      </div>

      <style>{`
        .timeline-page--romantic {
          position: relative;
          min-height: 100vh;
          background: #FFFDF5;
          padding-top: 5rem;
          padding-bottom: 4rem;
          overflow-x: hidden;
        }
        .timeline-page-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          max-width: 100%;
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
        .timeline-page-dots {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: radial-gradient(circle, rgba(212, 175, 55, 0.08) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .timeline-page-streaks {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255, 182, 193, 0.08) 60px, rgba(255, 182, 193, 0.08) 62px),
            repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(212, 175, 55, 0.08) 70px, rgba(212, 175, 55, 0.08) 72px);
        }
        .timeline-page-paisley {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-repeat: repeat;
          background-size: 80px 80px;
        }
        .timeline-page-floral-corner {
          position: fixed;
          width: 200px;
          height: 200px;
          pointer-events: none;
          z-index: 0;
          background-repeat: no-repeat;
          background-size: contain;
        }
        .timeline-page-floral-tl { top: 0; left: 0; }
        .timeline-page-floral-tr { top: 0; right: 0; transform: scaleX(-1); }
        .timeline-page-floral-bl { bottom: 0; left: 0; transform: scaleY(-1); }
        .timeline-page-floral-br { bottom: 0; right: 0; transform: scale(-1, -1); }
        .timeline-page-stars {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .timeline-page-star {
          position: absolute;
          font-size: 0.9rem;
          color: rgba(212, 175, 55, 0.3);
          transform: translate(-50%, -50%);
        }
        .timeline-petals {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          max-width: 100%;
          height: 100vh;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }
        .timeline-petal {
          position: absolute;
          top: -20px;
          border-radius: 50%;
          animation: timeline-petal-fall linear infinite;
        }
        .timeline-petal--shape-0 { border-radius: 50%; }
        .timeline-petal--shape-1 { border-radius: 40% 60% 50% 50%; }
        .timeline-petal--shape-2 { border-radius: 50% 30% 50% 40%; }
        @keyframes timeline-petal-fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        .timeline-page-inner {
          position: relative;
          z-index: 3;
          max-width: 960px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .timeline-page-header {
          margin-bottom: 2.5rem;
          text-align: center;
        }
        .timeline-page-label {
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C8860A;
          margin-bottom: 0.5rem;
        }
        .timeline-page-title {
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 1.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C8860A;
          margin: 0;
        }
        .timeline-page-intro {
          font-family: "Playfair Display", serif;
          font-style: italic;
          font-size: 0.95rem;
          color: #2D2D2D;
          margin-top: 0.75rem;
          margin-bottom: 0;
          opacity: 0.8;
        }
      `}</style>
    </motion.main>
  );
}
