import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import EventTimeline from "../components/EventTimeline";
import LocationSection from "../components/LocationSection";

const WEDDING_DATE = new Date("2026-03-26T00:00:00+05:30").getTime();
const WEDDING_DATE_LABEL = "26 March 2026";

const SCROLL_SECTIONS = ["timeline", "locations"];

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash ? location.hash.slice(1) : "";
    if (id && SCROLL_SECTIONS.includes(id)) {
      const el = document.getElementById(id);
      if (el) {
        const t = requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return () => cancelAnimationFrame(t);
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <motion.main
      className="page home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection
        weddingDateLabel={WEDDING_DATE_LABEL}
        weddingDateMs={WEDDING_DATE}
      />

      <EventTimeline />
      <LocationSection />

      <motion.section
        className="home-footer-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <Link to="/gallery" className="home-gallery-link">View Gallery</Link>
      </motion.section>

      <style>{`
        .home-page { min-height: 100vh; }
        .home-footer-cta {
          padding: 2.5rem 1rem;
          text-align: center;
          background: #0a0404;
        }
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
      `}</style>
    </motion.main>
  );
}
