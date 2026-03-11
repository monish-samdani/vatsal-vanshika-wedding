import React from "react";
import { motion } from "framer-motion";
import Timeline from "../components/Timeline";
import { timelineEvents } from "../data/timelineEvents";

export default function TimelinePage() {
  return (
    <motion.main
      className="page timeline-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        minHeight: "100vh",
        background: "#0A0404",
        paddingTop: "5.5rem",
        paddingBottom: "4rem"
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "0 1.5rem"
        }}
      >
        <header style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "0.5rem"
            }}
          >
            Our Wedding
          </p>
          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: "1.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-light)",
              margin: 0
            }}
          >
            Timeline
          </h1>
          <p
            style={{
              fontFamily: '"Playfair Display", serif',
              fontStyle: "italic",
              fontSize: "0.95rem",
              color: "var(--text-muted)",
              marginTop: "0.75rem",
              marginBottom: 0
            }}
          >
            All events in chronological order — Stardom Resort, Jaisinghpura, Jaipur
          </p>
        </header>
        <Timeline events={timelineEvents} />
      </div>
    </motion.main>
  );
}
