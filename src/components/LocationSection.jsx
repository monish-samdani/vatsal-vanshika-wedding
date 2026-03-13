import React from "react";
import { motion } from "framer-motion";

const LOCATIONS = [
  {
    id: "residence",
    title: "At Residence",
    subtitle: "Jaipur home",
    address: "Jaipur",
    directionsUrl: "https://www.google.com/maps/search/Jaipur",
  },
  {
    id: "resort",
    title: "Stardom Resort",
    subtitle: "Wedding resort",
    address: "Jaisinghpura, Jaipur",
    directionsUrl: "https://www.google.com/maps/search/Stardom+Resort+Jaisinghpura+Jaipur",
  },
];

/**
 * Two main wedding locations: Jaipur home (At Residence) and Wedding resort (Stardom Resort).
 * Cards show title, address, and optional directions link.
 */
export default function LocationSection() {
  return (
    <section className="location-section" id="locations">
      <div className="location-section-inner">
        <motion.h2
          className="location-section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          Venues
        </motion.h2>
        <div className="location-cards">
          {LOCATIONS.map((loc, i) => (
            <motion.article
              key={loc.id}
              className="location-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div className="location-card-content">
                <h3 className="location-card-title">{loc.title}</h3>
                {loc.subtitle && (
                  <p className="location-card-subtitle">{loc.subtitle}</p>
                )}
                <p className="location-card-address">{loc.address}</p>
                {loc.directionsUrl && (
                  <a
                    href={loc.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="location-card-directions"
                  >
                    Get directions
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .location-section {
          padding: 4rem 1rem 4.5rem;
          background: linear-gradient(180deg, #120808 0%, #0a0404 100%);
          scroll-margin-top: 4rem;
        }
        .location-section-inner {
          max-width: 960px;
          margin: 0 auto;
        }
        .location-section-title {
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-light);
          margin: 0 0 2rem;
          text-align: center;
        }
        .location-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        .location-card {
          border-radius: 16px;
          background: rgba(20,8,8,0.85);
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .location-card:hover {
          border-color: rgba(212,168,75,0.35);
          box-shadow: 0 16px 40px rgba(0,0,0,0.4);
        }
        .location-card-content {
          padding: 1.5rem 1.25rem;
        }
        .location-card-title {
          font-family: "Playfair Display", serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-light);
          margin: 0 0 0.25rem;
        }
        .location-card-subtitle {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin: 0 0 0.5rem;
        }
        .location-card-address {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin: 0 0 0.75rem;
        }
        .location-card-directions {
          display: inline-block;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          color: var(--gold-light);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .location-card-directions:hover {
          color: #fff;
        }
        @media (min-width: 640px) {
          .location-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 768px) {
          .location-section { padding: 5rem 1.5rem 5rem; }
        }
      `}</style>
    </section>
  );
}
