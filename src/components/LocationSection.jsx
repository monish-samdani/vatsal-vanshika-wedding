import React from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

const VENUES = [
  {
    id: "shekhawati",
    name: "Shekhawati Heights",
    address: "Lalarpura, Jaipur",
    type: "At Residence",
    typeEmoji: "🏠",
    mapsUrl: "https://maps.app.goo.gl/TG4kRHjibR74cG7z7",
    events: ["Ganesh Pujan"]
  },
  {
    id: "stardom",
    name: "Stardom Resort",
    address: "Jaisinghpura, Jaipur",
    type: "Wedding Venue",
    typeEmoji: "🏨",
    mapsUrl: "https://maps.app.goo.gl/H4oz8EAbt3Sy6hq26",
    events: ["Sufi Night", "Haldi", "Mehndi", "Sajjangoth", "Baraat Nikasi", "Phere", "Reception"]
  }
];

const FLORAL_CARD = `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q25 42 48 28 T78 8' stroke='%23D4AF37' stroke-width='1' fill='none' opacity='0.3'/%3E%3Cellipse cx='18' cy='38' rx='6' ry='4' fill='%23D4AF37' opacity='0.3'/%3E%3Ccircle cx='48' cy='22' r='3' fill='%23D4AF37' opacity='0.3'/%3E%3C/svg%3E")`;

export default function LocationSection() {
  return (
    <motion.section
      className="location-section"
      id="locations"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Section background: dot grid + watercolor blobs */}
      <div className="location-section-dots" aria-hidden="true" />
      <div className="location-section-blobs" aria-hidden="true" />

      <div className="location-section-inner">
        <header className="location-section-header">
          <h2 className="location-section-title">Our Venues</h2>
          <div className="location-section-divider" aria-hidden="true">
            <span className="location-section-divider-line" />
            <span className="location-section-divider-diamond">◇</span>
            <span className="location-section-divider-line" />
            <span className="location-section-divider-diamond">◇</span>
            <span className="location-section-divider-line" />
            <span className="location-section-divider-diamond">◇</span>
            <span className="location-section-divider-line" />
          </div>
        </header>

        <div className="location-cards">
          {VENUES.map((venue, i) => (
            <motion.article
              key={venue.id}
              className="location-card"
              initial={{ opacity: 0, y: 40, x: i === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="location-card-floral location-card-floral-tl" style={{ backgroundImage: FLORAL_CARD }} aria-hidden="true" />
              <div className="location-card-floral location-card-floral-tr" style={{ backgroundImage: FLORAL_CARD }} aria-hidden="true" />

              <span className="location-card-badge">
                {venue.typeEmoji} {venue.type}
              </span>

              <h3 className="location-card-name">{venue.name}</h3>
              <p className="location-card-address">
                <span className="location-card-address-icon" aria-hidden="true">📍</span>
                {venue.address}
              </p>

              <div className="location-card-divider" aria-hidden="true" />

              <div className="location-card-qr-wrap">
                <div className="location-card-qr-box">
                  <QRCodeSVG value={venue.mapsUrl} size={160} level="M" />
                </div>
                <p className="location-card-qr-label">Scan to open in Google Maps</p>
              </div>

              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="location-card-directions"
              >
                Get Directions →
              </a>

              <div className="location-card-divider" aria-hidden="true" />

              <h4 className="location-card-events-heading">Events here:</h4>
              <ul className="location-card-events-list">
                {venue.events.map((eventName) => (
                  <li key={eventName} className="location-card-event-item">
                    <span className="location-card-event-dot" aria-hidden="true">•</span>
                    <span className="location-card-event-name">{eventName}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .location-section {
          position: relative;
          padding: 4rem 1rem 5rem;
          background: #FFFDF5;
          scroll-margin-top: 4rem;
          overflow-x: hidden;
          max-width: 100%;
        }
        .location-section-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: radial-gradient(circle, rgba(212, 175, 55, 0.08) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .location-section-blobs {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(ellipse 50% 45% at 0% 0%, rgba(255, 182, 193, 0.22) 0%, transparent 55%),
            radial-gradient(ellipse 45% 40% at 100% 0%, rgba(212, 175, 55, 0.18) 0%, transparent 50%),
            radial-gradient(ellipse 45% 45% at 0% 100%, rgba(255, 160, 122, 0.18) 0%, transparent 50%),
            radial-gradient(ellipse 50% 45% at 100% 100%, rgba(220, 120, 140, 0.15) 0%, transparent 50%);
        }
        .location-section-inner {
          position: relative;
          z-index: 1;
          max-width: 960px;
          margin: 0 auto;
        }
        .location-section-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .location-section-title {
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C8860A;
          margin: 0 0 1rem;
        }
        .location-section-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .location-section-divider-line {
          width: 40px;
          height: 1px;
          background: rgba(212, 175, 55, 0.6);
        }
        .location-section-divider-diamond {
          font-size: 0.5rem;
          color: #D4AF37;
        }
        .location-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .location-cards { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        }
        .location-card {
          position: relative;
          background: #FFFFFF;
          border: 2px solid #D4AF37;
          border-radius: 20px;
          padding: 1.5rem 1.5rem 2rem;
          box-shadow: 0 8px 40px rgba(212, 175, 55, 0.2);
          overflow: hidden;
        }
        .location-card-floral {
          position: absolute;
          top: 0;
          width: 80px;
          height: 80px;
          pointer-events: none;
          background-repeat: no-repeat;
          background-size: contain;
          z-index: 0;
        }
        .location-card-floral-tl { left: 0; }
        .location-card-floral-tr { right: 0; transform: scaleX(-1); }
        .location-card-badge {
          position: relative;
          z-index: 1;
          display: inline-block;
          padding: 0.35rem 0.85rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, #D4AF37, #b8962e);
          border-radius: 999px;
          margin-bottom: 1rem;
        }
        .location-card-name {
          position: relative;
          z-index: 1;
          font-family: "Playfair Display", serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #C8860A;
          margin: 0 0 0.5rem;
          letter-spacing: 0.02em;
        }
        .location-card-address {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.95rem;
          color: #2D2D2D;
          margin: 0 0 1rem;
          line-height: 1.5;
        }
        .location-card-address-icon { font-size: 1rem; }
        .location-card-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
          margin: 1rem 0;
          opacity: 0.7;
        }
        .location-card-qr-wrap {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 1rem 0;
        }
        .location-card-qr-box {
          padding: 12px;
          border: 4px solid #D4AF37;
          border-radius: 12px;
          background: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .location-card-qr-box svg {
          display: block;
          width: 160px;
          height: 160px;
        }
        .location-card-qr-label {
          margin: 0.6rem 0 0;
          font-size: 0.8rem;
          color: #C8860A;
          letter-spacing: 0.03em;
        }
        .location-card-directions {
          position: relative;
          z-index: 1;
          display: block;
          width: 100%;
          padding: 0.75rem 1.25rem;
          font-family: "Playfair Display", serif;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-align: center;
          text-decoration: none;
          color: #1a1205;
          background: linear-gradient(135deg, #D4AF37, #b8962e);
          border: 2px solid #D4AF37;
          border-radius: 10px;
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
          transition: background 0.25s ease, transform 0.2s ease;
        }
        .location-card-directions:hover {
          background: linear-gradient(135deg, #e0bc45, #c9a030);
          transform: translateY(-1px);
        }
        .location-card-events-heading {
          position: relative;
          z-index: 1;
          font-family: "Playfair Display", serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C8860A;
          margin: 1rem 0 0.75rem;
        }
        .location-card-events-list {
          position: relative;
          z-index: 1;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .location-card-event-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0;
          font-size: 0.9rem;
          color: #2D2D2D;
        }
        .location-card-event-dot {
          color: #D4AF37;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .location-card-event-name {
          font-family: "Playfair Display", serif;
          font-weight: 500;
        }
        @media (min-width: 768px) {
          .location-section { padding: 5rem 1.5rem 6rem; }
          .location-section-title { font-size: 1.65rem; }
          .location-card { padding: 2rem 2rem 2.5rem; }
          .location-card-name { font-size: 1.75rem; }
        }
      `}</style>
    </motion.section>
  );
}
