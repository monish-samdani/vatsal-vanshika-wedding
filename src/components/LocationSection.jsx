import React from "react";
import { motion } from "framer-motion";

const MANDALA_BG = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 15v4M50 81v4M15 50h4M81 50h4M28 28l2.8 2.8M69 69l2.8 2.8M28 72l2.8-2.8M69 31l-2.8-2.8' stroke='rgba(212,175,55,0.08)' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='8' stroke='rgba(212,175,55,0.06)' stroke-width='0.4' fill='none'/%3E%3Ccircle cx='50' cy='50' r='3' fill='rgba(212,175,55,0.05)'/%3E%3C/svg%3E")`;

const LOCATIONS = [
  {
    id: "residence",
    title: "At Residence",
    subtitle: "Jaipur home",
    address: "Jaipur",
    directionsUrl: "https://www.google.com/maps/search/Jaipur"
  },
  {
    id: "resort",
    title: "Stardom Resort",
    subtitle: "Wedding resort",
    address: "Jaisinghpura, Jaipur",
    directionsUrl: "https://www.google.com/maps/search/Stardom+Resort+Jaisinghpura+Jaipur"
  }
];

/**
 * Premium white & gold location section: ivory background, white cards with gold border,
 * venue name in saffron, "Get Directions" gold outlined button, subtle drop shadow.
 */
export default function LocationSection() {
  return (
    <section className="location-section location-section--premium" id="locations">
      <div className="location-section-bg" aria-hidden="true" style={{ backgroundImage: MANDALA_BG }} />
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
              className="location-card location-card--premium"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                    Get Directions
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .location-section--premium {
          position: relative;
          padding: 4rem 1rem 4.5rem;
          background: #FFFDF5;
          scroll-margin-top: 4rem;
        }
        .location-section-bg {
          position: absolute;
          inset: 0;
          opacity: 0.7;
          pointer-events: none;
        }
        .location-section-inner {
          position: relative;
          z-index: 1;
          max-width: 960px;
          margin: 0 auto;
        }
        .location-section-title {
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C8860A;
          margin: 0 0 2rem;
          text-align: center;
        }
        .location-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        .location-card--premium {
          background: #FFFFFF;
          border: 2px solid #D4AF37;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: box-shadow 0.25s ease;
        }
        .location-card--premium:hover {
          box-shadow: 0 8px 32px rgba(212,175,55,0.2);
        }
        .location-card-content {
          padding: 1.5rem 1.25rem;
        }
        .location-card-title {
          font-family: "Playfair Display", serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #C8860A;
          margin: 0 0 0.25rem;
        }
        .location-card-subtitle {
          font-size: 0.8rem;
          color: #2D2D2D;
          opacity: 0.8;
          margin: 0 0 0.5rem;
        }
        .location-card-address {
          font-size: 0.95rem;
          color: #2D2D2D;
          margin: 0 0 0.75rem;
        }
        .location-card-directions {
          display: inline-block;
          padding: 0.5rem 1.25rem;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          font-weight: 500;
          color: #C8860A;
          background: transparent;
          border: 2px solid #D4AF37;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .location-card-directions:hover {
          background: rgba(212,175,55,0.12);
          color: #b8962e;
        }
        @media (min-width: 640px) {
          .location-cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 768px) {
          .location-section--premium { padding: 5rem 1.5rem 5rem; }
        }
      `}</style>
    </section>
  );
}
