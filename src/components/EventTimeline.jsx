import React from "react";
import { motion } from "framer-motion";
import TimelineEvent from "./TimelineEvent";
import { timelineEvents } from "../data/timelineEvents";

/**
 * Vertical timeline of wedding events (name, date, time only — no descriptions).
 * Each event is clickable and navigates to its existing event page.
 */
export default function EventTimeline() {
  return (
    <section className="event-timeline-section" id="timeline">
      <div className="event-timeline-bg" aria-hidden="true" />
      <div className="event-timeline-inner">
        <motion.h2
          className="event-timeline-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          Our Celebrations
        </motion.h2>
        <p className="event-timeline-intro">
          Join us at Stardom Resort, Jaisinghpura, Jaipur for every moment of our wedding.
        </p>

        <div className="event-timeline">
          <div className="event-timeline-line" aria-hidden="true" />
          <ol className="event-timeline-list">
            {timelineEvents.map((event, index) => (
              <motion.li
                key={event.id}
                className="event-timeline-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="event-timeline-marker"
                  style={{ borderColor: event.accent || "var(--gold)" }}
                />
                <div className="event-timeline-node">
                  <TimelineEvent event={event} />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        .event-timeline-section {
          position: relative;
          padding: 3.5rem 1rem 4rem;
          background: linear-gradient(180deg, #0a0404 0%, #0f0606 35%, #120808 70%, #0a0404 100%);
          scroll-margin-top: 4rem;
          overflow: hidden;
        }
        .event-timeline-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% 20%, rgba(212,168,75,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(212,168,75,0.04) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 15% 60%, rgba(139,92,246,0.03) 0%, transparent 45%);
          pointer-events: none;
        }
        .event-timeline-inner {
          position: relative;
          z-index: 1;
          max-width: 640px;
          margin: 0 auto;
          width: 100%;
        }
        .event-timeline-title {
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-light);
          margin: 0 0 0.5rem;
          text-align: center;
        }
        .event-timeline-intro {
          font-size: 0.9rem;
          color: var(--text-muted);
          text-align: center;
          margin: 0 auto 2.5rem;
          max-width: 480px;
        }
        .event-timeline {
          position: relative;
        }
        .event-timeline-line {
          position: absolute;
          left: 21px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, rgba(212,168,75,0.6), rgba(212,168,75,0.2));
          border-radius: 1px;
        }
        .event-timeline-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .event-timeline-item {
          position: relative;
          padding-left: 3.5rem;
          padding-bottom: 1.5rem;
        }
        .event-timeline-item:last-child { padding-bottom: 0; }
        .event-timeline-marker {
          position: absolute;
          left: 0;
          top: 0.6rem;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 3px solid var(--gold);
          background: var(--deep);
          box-shadow: 0 0 0 4px rgba(10,4,4,0.95), 0 4px 12px rgba(0,0,0,0.3);
        }
        .event-timeline-node { width: 100%; }
        .timeline-event-wrap { display: block; width: 100%; min-height: 48px; }
        .timeline-event-card {
          padding: 1.2rem 1.35rem;
          border-radius: 16px;
          background: rgba(18,8,8,0.94);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2), 0 8px 32px rgba(0,0,0,0.15), 0 0 0 1px rgba(212,168,75,0.06);
          transition: box-shadow 0.28s ease, border-color 0.28s ease;
        }
        .timeline-event-card[role="button"] {
          cursor: pointer;
        }
        .timeline-event-card:hover {
          box-shadow: 0 12px 28px rgba(0,0,0,0.35), 0 24px 56px rgba(0,0,0,0.25), 0 0 0 1px rgba(212,168,75,0.12);
          border-color: rgba(212,168,75,0.3);
        }
        .timeline-event-emoji {
          font-size: 1.4rem;
          display: block;
          margin-bottom: 0.35rem;
        }
        .timeline-event-name {
          font-family: "Playfair Display", serif;
          font-size: clamp(1rem, 2.5vw, 1.1rem);
          font-weight: 600;
          color: var(--text-light);
          margin: 0 0 0.35rem;
        }
        .timeline-event-date,
        .timeline-event-time {
          font-size: clamp(0.78rem, 2vw, 0.85rem);
          color: var(--text-muted);
          margin: 0;
        }
        .timeline-event-time { margin-top: 0.2rem; }
        @media (min-width: 768px) {
          .event-timeline-section { padding: 5rem 1.5rem 5rem; }
          .event-timeline-line { left: 24px; }
          .event-timeline-item { padding-left: 4rem; }
          .event-timeline-marker { width: 48px; height: 48px; top: 0.4rem; }
        }
      `}</style>
    </section>
  );
}
