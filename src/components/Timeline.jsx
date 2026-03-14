import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HERO_PHOTO = "/photos/home-bg.jpg";

/** Event id → photo path; fallback to hero if not found (handled via img onError). */
function getEventPhotoPath(eventId) {
  return `/photos/${eventId}.jpg`;
}

/** Parse "23 March 2026" or "Monday, 23 March 2026" to get date for progress. */
function parseEventDate(dateStr) {
  if (!dateStr) return null;
  const match = dateStr.match(/(\d{1,2})\s+March\s+2026/i);
  if (!match) return null;
  return new Date(2026, 2, parseInt(match[1], 10));
}

function getDaysToGo(dateStr) {
  const d = parseEventDate(dateStr);
  if (!d) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.ceil((d - now) / (24 * 60 * 60 * 1000));
}

/**
 * Romantic zigzag timeline: odd cards LEFT, even RIGHT, gold center line & dots.
 * Each card: soft blurred couple photo, dark overlay, white title, gold CTA, progress bar.
 */
export default function Timeline({ events }) {
  const navigate = useNavigate();
  if (!events || events.length === 0) return null;

  return (
    <div className="timeline-romantic">
      <div className="timeline-romantic-line" aria-hidden="true" />
      <ol className="timeline-romantic-list">
        {events.map((event, index) => {
          const isLeft = index % 2 === 0;
          const daysToGo = getDaysToGo(event.date);
          const isPast = daysToGo !== null && daysToGo <= 0;
          const progress = isPast ? 100 : (daysToGo === null ? 0 : Math.max(0, 100 - (daysToGo / 90) * 100));

          return (
            <React.Fragment key={event.id || index}>
              {index > 0 && (
                <li className="timeline-romantic-divider" aria-hidden="true">
                  <span className="timeline-romantic-divider-line" />
                  <span className="timeline-romantic-divider-diamond">◇</span>
                  <span className="timeline-romantic-divider-line" />
                  <span className="timeline-romantic-divider-diamond">◇</span>
                  <span className="timeline-romantic-divider-line" />
                  <span className="timeline-romantic-divider-diamond">◇</span>
                  <span className="timeline-romantic-divider-line" />
                </li>
              )}
              <motion.li
                className={`timeline-romantic-item timeline-romantic-item--${isLeft ? "left" : "right"}`}
                initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="timeline-romantic-dot" aria-hidden="true" />
                <motion.div
                  className="timeline-romantic-card"
                  onClick={() => event.path && navigate(event.path)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="timeline-romantic-card-bg" aria-hidden="true">
                    <img
                      src={getEventPhotoPath(event.id)}
                      alt=""
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = HERO_PHOTO;
                      }}
                    />
                  </div>
                  <div className="timeline-romantic-card-overlay" aria-hidden="true" />
                  <div className="timeline-romantic-card-content">
                    <h3 className="timeline-romantic-card-title">{event.title}</h3>
                    <p className="timeline-romantic-card-cta">Click to explore →</p>
                    <div className="timeline-romantic-card-progress">
                      {isPast ? (
                        <span className="timeline-romantic-completed">Completed ✓</span>
                      ) : (
                        <>
                          <span className="timeline-romantic-days">
                            {daysToGo !== null ? `${daysToGo} days to go` : ""}
                          </span>
                          <div className="timeline-romantic-bar">
                            <div
                              className="timeline-romantic-bar-fill"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.li>
            </React.Fragment>
          );
        })}
      </ol>

      <style>{`
        .timeline-romantic { position: relative; padding: 0 0 3rem; }
        .timeline-romantic-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          margin-left: -1.5px;
          background: linear-gradient(180deg, #D4AF37, #b8962e);
          border-radius: 2px;
          box-shadow: 0 0 16px rgba(212, 175, 55, 0.4);
        }
        .timeline-romantic-list { list-style: none; margin: 0; padding: 0; }
        .timeline-romantic-divider {
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin: 0.75rem 0;
          padding: 0 1rem;
          pointer-events: none;
          position: relative;
          z-index: 0;
        }
        .timeline-romantic-divider-line {
          flex: 1;
          max-width: 120px;
          height: 1px;
          background: rgba(212, 175, 55, 0.3);
        }
        .timeline-romantic-divider-diamond {
          font-size: 0.5rem;
          color: rgba(212, 175, 55, 0.3);
          line-height: 1;
        }
        .timeline-romantic-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          min-height: 220px;
        }
        .timeline-romantic-item:last-child { margin-bottom: 0; }
        .timeline-romantic-item--left {
          flex-direction: row;
          padding-right: 50%;
          padding-left: 1rem;
        }
        .timeline-romantic-item--left .timeline-romantic-card { margin-right: 2rem; }
        .timeline-romantic-item--right {
          flex-direction: row-reverse;
          padding-left: 50%;
          padding-right: 1rem;
        }
        .timeline-romantic-item--right .timeline-romantic-card { margin-left: 2rem; }
        .timeline-romantic-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 16px;
          height: 16px;
          margin-left: -8px;
          margin-top: -8px;
          border-radius: 50%;
          background: #D4AF37;
          border: 3px solid #FFFDF5;
          box-shadow: 0 0 0 2px #D4AF37, 0 0 20px rgba(212, 175, 55, 0.6);
          z-index: 2;
        }
        .timeline-romantic-card {
          position: relative;
          flex: 0 1 auto;
          max-width: 380px;
          width: 100%;
          min-height: 240px;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        }
        .timeline-romantic-card-bg {
          position: absolute;
          inset: 0;
          filter: blur(4px);
          transform: scale(1.08);
        }
        .timeline-romantic-card-bg img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .timeline-romantic-card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10,0,0,0.45);
        }
        .timeline-romantic-card-content {
          position: relative;
          z-index: 1;
          height: 100%;
          min-height: 240px;
          padding: 2rem 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .timeline-romantic-card-title {
          font-family: "Playfair Display", serif;
          font-size: clamp(1.2rem, 2.5vw, 1.5rem);
          font-weight: 600;
          color: #fff;
          margin: 0 0 0.75rem;
          line-height: 1.3;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .timeline-romantic-card-cta {
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          color: #D4AF37;
          margin: 0 auto 1rem;
        }
        .timeline-romantic-card-progress {
          margin-top: auto;
          width: 100%;
        }
        .timeline-romantic-days {
          display: block;
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          color: #D4AF37;
          margin-bottom: 0.35rem;
        }
        .timeline-romantic-bar {
          height: 4px;
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
          overflow: hidden;
        }
        .timeline-romantic-bar-fill {
          height: 100%;
          background: #D4AF37;
          border-radius: 2px;
          transition: width 0.5s ease;
        }
        .timeline-romantic-completed {
          font-size: 0.75rem;
          color: #22c55e;
          font-weight: 500;
        }
        @media (max-width: 767px) {
          .timeline-romantic-line { left: 1.5rem; margin-left: 0; }
          .timeline-romantic-item--left,
          .timeline-romantic-item--right {
            flex-direction: row;
            padding-left: 4rem;
            padding-right: 1rem;
            justify-content: flex-start;
            min-height: 200px;
          }
          .timeline-romantic-item--left .timeline-romantic-card,
          .timeline-romantic-item--right .timeline-romantic-card {
            margin-left: 1.25rem;
            margin-right: 0;
          }
          .timeline-romantic-dot { left: 1.5rem; margin-left: 0; }
          .timeline-romantic-card { max-width: none; min-height: 200px; }
          .timeline-romantic-card-content { min-height: 200px; }
        }
      `}</style>
    </div>
  );
}
