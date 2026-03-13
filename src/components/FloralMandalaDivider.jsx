import React from "react";

/**
 * Floral / mandala-style SVG divider for the timeline.
 */
export default function FloralMandalaDivider() {
  return (
    <div className="timeline-floral-divider" aria-hidden="true">
      <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="16" r="3" fill="rgba(212,168,75,0.5)" />
        <circle cx="40" cy="16" r="1.5" fill="rgba(255,255,255,0.3)" />
        <path d="M40 10v2M40 20v2M36 14h2M42 14h2M37 11l1.5 1.5M41.5 11L40 12.5M37 21l1.5-1.5M41.5 21L40 19.5M33 16h2M45 16h2" stroke="rgba(212,168,75,0.4)" strokeWidth="0.6" />
        <circle cx="32" cy="12" r="1.2" fill="rgba(212,168,75,0.35)" />
        <circle cx="48" cy="12" r="1.2" fill="rgba(212,168,75,0.35)" />
        <circle cx="32" cy="20" r="1.2" fill="rgba(212,168,75,0.35)" />
        <circle cx="48" cy="20" r="1.2" fill="rgba(212,168,75,0.35)" />
        <path d="M28 16q4 0 4-2M52 16q-4 0-4-2" stroke="rgba(212,168,75,0.2)" strokeWidth="0.5" fill="none" />
      </svg>
    </div>
  );
}
