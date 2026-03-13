import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloralMandalaDivider from "./FloralMandalaDivider";

/**
 * Gradient themes per event (gold, purple, pink, yellow, deep red, etc.)
 */
const EVENT_GRADIENTS = {
  "ganesh-pujan": "linear-gradient(135deg, #c9a227 0%, #b8860b 50%, #8b6914 100%)",
  "sufi-night": "linear-gradient(135deg, #9f7aea 0%, #7c3aed 50%, #5b21b6 100%)",
  "haldi": "linear-gradient(135deg, #facc15 0%, #eab308 50%, #ca8a04 100%)",
  "sajjangoth": "linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)",
  "baraat": "linear-gradient(135deg, #d97706 0%, #b45309 50%, #92400e 100%)",
  "phere": "linear-gradient(135deg, #b91c1c 0%, #991b1b 50%, #7f1d1d 100%)",
  "reception": "linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)"
};

const defaultGradient = "linear-gradient(135deg, #b8860b 0%, #8b6914 100%)";

/**
 * Timeline component — premium zigzag layout with alternating left/right cards,
 * unique gradients, floral dividers, gold center line, name + icon only, click to navigate.
 */
export default function Timeline({ events }) {
  const navigate = useNavigate();
  if (!events || events.length === 0) return null;

  return (
    <div className="timeline-zigzag">
      <div className="timeline-zigzag-line" aria-hidden="true" />
      <ol className="timeline-zigzag-list">
        {events.map((item, index) => {
          const isLeft = index % 2 === 0;
          const gradient = EVENT_GRADIENTS[item.id] || defaultGradient;

          return (
            <React.Fragment key={item.id || index}>
              <motion.li
                className={`timeline-zigzag-item timeline-zigzag-item--${isLeft ? "left" : "right"}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="timeline-zigzag-dot" aria-hidden="true" />
                <motion.div
                  className="timeline-zigzag-card"
                  style={{ background: gradient }}
                  onClick={() => item.path && navigate(item.path)}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(212,168,75,0.4), 0 16px 48px rgba(0,0,0,0.35)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="timeline-zigzag-icon" aria-hidden="true">
                    {item.emoji || "✨"}
                  </span>
                  <span className="timeline-zigzag-name">{item.title}</span>
                </motion.div>
              </motion.li>
              {index < events.length - 1 && (
                <li className="timeline-zigzag-divider-wrap" aria-hidden="true">
                  <FloralMandalaDivider />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>

      <style>{`
        .timeline-zigzag {
          position: relative;
          padding: 0 0 3rem;
        }
        .timeline-zigzag-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          margin-left: -1.5px;
          background: linear-gradient(180deg, #d4a84b 0%, #b8860b 50%, #8b6914 100%);
          border-radius: 2px;
          box-shadow: 0 0 12px rgba(212,168,75,0.3);
        }
        .timeline-zigzag-list {
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
          z-index: 1;
        }
        .timeline-zigzag-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
          min-height: 72px;
        }
        .timeline-zigzag-item--left {
          flex-direction: row;
          padding-right: 50%;
          padding-left: 1rem;
        }
        .timeline-zigzag-item--left .timeline-zigzag-card {
          margin-right: 1.5rem;
        }
        .timeline-zigzag-item--right {
          flex-direction: row-reverse;
          padding-left: 50%;
          padding-right: 1rem;
        }
        .timeline-zigzag-item--right .timeline-zigzag-card {
          margin-left: 1.5rem;
        }
        .timeline-zigzag-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 14px;
          height: 14px;
          margin-left: -7px;
          margin-top: -7px;
          border-radius: 50%;
          background: #d4a84b;
          border: 3px solid #0a0404;
          box-shadow: 0 0 0 2px #d4a84b, 0 0 16px rgba(212,168,75,0.5);
          z-index: 2;
        }
        .timeline-zigzag-card {
          flex: 0 1 auto;
          max-width: 280px;
          min-width: 0;
          padding: 1rem 1.35rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          transition: box-shadow 0.3s ease, transform 0.25s ease;
        }
        .timeline-zigzag-card:hover {
          box-shadow: 0 0 28px rgba(212,168,75,0.35), 0 12px 40px rgba(0,0,0,0.35);
        }
        .timeline-zigzag-icon {
          font-size: 1.75rem;
          line-height: 1;
          flex-shrink: 0;
        }
        .timeline-zigzag-name {
          font-family: "Playfair Display", serif;
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255,255,255,0.98);
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
          line-height: 1.3;
        }
        .timeline-floral-divider {
          display: flex;
          justify-content: center;
          padding: 0.5rem 0;
        }
        .timeline-floral-divider svg {
          width: 56px;
          height: 24px;
        }
        .timeline-zigzag-divider-wrap {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        @media (max-width: 767px) {
          .timeline-zigzag-line {
            left: 1.25rem;
            margin-left: 0;
          }
          .timeline-zigzag-item--left,
          .timeline-zigzag-item--right {
            flex-direction: row;
            padding-left: 3rem;
            padding-right: 1rem;
            justify-content: flex-start;
          }
          .timeline-zigzag-item--left .timeline-zigzag-card,
          .timeline-zigzag-item--right .timeline-zigzag-card {
            margin-left: 1rem;
            margin-right: 0;
          }
          .timeline-zigzag-dot {
            left: 1.25rem;
            margin-left: 0;
          }
          .timeline-zigzag-card {
            max-width: none;
            width: 100%;
            min-height: 52px;
          }
        }
      `}</style>
    </div>
  );
}
