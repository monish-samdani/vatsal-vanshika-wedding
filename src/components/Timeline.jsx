import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Timeline component — displays a list of events in chronological order.
 * Each item shows date, title, and description; optional link via path.
 */
export default function Timeline({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="timeline">
      <div className="timeline-line" aria-hidden="true" />
      <ol className="timeline-list">
        {events.map((item, index) => (
          <motion.li
            key={item.id || index}
            className="timeline-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <div
              className="timeline-marker"
              style={{ borderColor: item.accent || "var(--gold)" }}
            />
            <div className="timeline-content">
              <div className="timeline-meta">
                <span className="timeline-date">{item.date}</span>
                {item.time && (
                  <span className="timeline-time"> · {item.time}</span>
                )}
              </div>
              <h3 className="timeline-title">
                {item.emoji && (
                  <span className="timeline-emoji" aria-hidden="true">
                    {item.emoji}
                  </span>
                )}
                {item.path ? (
                  <Link to={item.path} className="timeline-title-link">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </h3>
              {item.description && (
                <p className="timeline-description">{item.description}</p>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
      <style>{`
        .timeline { position: relative; padding: 0 0 2rem; }
        .timeline-line {
          position: absolute;
          left: 11px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, var(--gold), var(--gold-dark));
          opacity: 0.5;
          border-radius: 1px;
        }
        .timeline-list { list-style: none; margin: 0; padding: 0; }
        .timeline-item { position: relative; padding-left: 2.5rem; padding-bottom: 2rem; }
        .timeline-item:last-child { padding-bottom: 0; }
        .timeline-marker {
          position: absolute;
          left: 0;
          top: 0.35rem;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid var(--gold);
          background: var(--deep);
          box-shadow: 0 0 0 4px rgba(10,4,4,0.9);
        }
        .timeline-content { }
        .timeline-meta { margin-bottom: 0.25rem; }
        .timeline-date, .timeline-time {
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: var(--gold-light);
        }
        .timeline-title {
          font-family: "Playfair Display", serif;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          color: var(--text-light);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .timeline-emoji { font-size: 1.2rem; }
        .timeline-title-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .timeline-title-link:hover { color: var(--gold-light); }
        .timeline-description {
          font-size: 0.9rem;
          line-height: 1.55;
          color: var(--text-muted);
          margin: 0;
        }
      `}</style>
    </div>
  );
}
