import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HOVER_SCALE = 1.03;
const EXPAND_SCALE = 1.05;
const NAV_DELAY_MS = 220;
const TRANSITION_MS = 0.28;

/**
 * Floating event card for the timeline. Shows name, date, time only.
 * On click: card expands slightly, then navigates to the event page after a short delay.
 */
export default function TimelineEvent({ event }) {
  const navigate = useNavigate();
  const [isExpanding, setIsExpanding] = useState(false);

  if (!event) return null;

  const { name, title, date, time, path, emoji, accent } = event;
  const displayName = title || name;

  const handleClick = () => {
    if (!path) return;
    setIsExpanding(true);
    setTimeout(() => navigate(path), NAV_DELAY_MS);
  };

  const handleKeyDown = (e) => {
    if (path && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleClick();
    }
  };

  const content = (
    <motion.div
      className="timeline-event-card"
      role={path ? "button" : null}
      tabIndex={path ? 0 : undefined}
      onClick={path ? handleClick : undefined}
      onKeyDown={path ? handleKeyDown : undefined}
      whileHover={path && !isExpanding ? { scale: HOVER_SCALE, y: -6, transition: { duration: TRANSITION_MS } } : undefined}
      whileTap={path && !isExpanding ? { scale: 0.98, transition: { duration: 0.12 } } : undefined}
      animate={isExpanding ? { scale: EXPAND_SCALE, transition: { duration: 0.2 } } : { scale: 1 }}
      transition={{ duration: TRANSITION_MS, ease: [0.22, 1, 0.36, 1] }}
      style={{ "--accent": accent || "var(--gold)" }}
    >
      {emoji && <span className="timeline-event-emoji">{emoji}</span>}
      <h3 className="timeline-event-name">{displayName}</h3>
      <p className="timeline-event-date">{date}</p>
      {time && <p className="timeline-event-time">{time}</p>}
    </motion.div>
  );

  return <div className="timeline-event-wrap">{content}</div>;
}
