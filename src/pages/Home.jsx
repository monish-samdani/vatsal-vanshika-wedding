import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WEDDING_DATE = new Date("2026-03-26T00:00:00+05:30").getTime();
const WEDDING_DATE_LABEL = "26 March 2026";

const EVENTS = [
  { id: "ganesh-pujan", name: "Ganesh Pujan & Vinayak Sthapana", path: "/ganesh-pujan", emoji: "🙏", date: "Monday, 23 March 2026", time: "Ganesh Pujan – 10:15 AM | Vinayak Sthapana – 12:15 PM", accent: "#FF8C42" },
  { id: "sufi-night", name: "Sufi Night", path: "/sufi-night", emoji: "🎤", date: "25 March 2026", time: "7:30 PM onwards", accent: "#8B5CF6" },
  { id: "haldi", name: "The Joy Carnival — Haldi", path: "/haldi", emoji: "💛", date: "26 March 2026", time: "10:00 AM", accent: "#F0C030" },
  { id: "sajjangoth", name: "Sajjangoth", path: "/sajjangoth", emoji: "🌺", date: "26 March 2026", time: "1:30 PM", accent: "#E879A0" },
  { id: "baraat", name: "Baraat Nikasi", path: "/baraat", emoji: "🐴", date: "26 March 2026", time: "6:15 PM", accent: "#D4A84B" },
  { id: "phere", name: "Phere (Wedding Ceremony)", path: "/phere", emoji: "🪔", date: "26 March 2026", time: "Midnight (12:00 AM)", accent: "#E8856A" },
  { id: "reception", name: "Reception", path: "/reception", emoji: "✨", date: "Thursday, 26 March 2026", time: "8:30 PM onwards", accent: "#60BDFF" }
];

function useCountdown(target) {
  const [diff, setDiff] = useState(target - Date.now());
  useEffect(() => {
    const interval = setInterval(() => setDiff(target - Date.now()), 1000);
    return () => clearInterval(interval);
  }, [target]);
  return useMemo(() => {
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  }, [diff]);
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export default function Home() {
  const countdown = useCountdown(WEDDING_DATE);

  return (
    <motion.main
      className="page home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Full-width hero */}
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <motion.p
            className="home-hero-subtitle"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            Together with their families
          </motion.p>
          <motion.h1
            className="home-hero-names"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Vatsal <span className="home-hero-amp">&</span> Vanshika
          </motion.h1>
          <motion.p
            className="home-hero-date"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.55 }}
          >
            {WEDDING_DATE_LABEL}
          </motion.p>
          <motion.div
            className="home-hero-countdown"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { label: "Days", value: countdown.days },
              { label: "Hours", value: countdown.hours },
              { label: "Minutes", value: countdown.minutes },
              { label: "Seconds", value: countdown.seconds }
            ].map((item) => (
              <div key={item.label} className="home-countdown-item">
                <span className="home-countdown-value">{String(item.value).padStart(2, "0")}</span>
                <span className="home-countdown-label">{item.label}</span>
              </div>
            ))}
          </motion.div>
          <motion.p
            className="home-hero-credits"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.9 }}
          >
            Mandhania Family welcomes you · S/o Mrs. Aruna & Mr. Madhusudan Mandhania · D/o Mrs. Pooja & Mr. Rajesh Dhingra
          </motion.p>
        </div>
      </section>

      {/* Events section */}
      <section className="home-events">
        <div className="home-events-inner">
          <motion.h2
            className="home-events-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            Our Celebrations
          </motion.h2>
          <p className="home-events-intro">
            Join us at Stardom Resort, Jaisinghpura, Jaipur for every moment of our wedding.
          </p>
          <div className="home-events-grid">
            {EVENTS.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={event.path} className="home-event-card">
                  <span className="home-event-emoji">{event.emoji}</span>
                  <h3 className="home-event-name">{event.name}</h3>
                  <p className="home-event-meta">{event.date}</p>
                  <p className="home-event-time">⏰ {event.time}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="home-gallery-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/gallery" className="home-gallery-link">View Gallery</Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        .home-page { min-height: 100vh; }
        .home-hero {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        .home-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url(/photos/home-bg.jpg), linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #1a0a0a 100%);
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .home-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.6) 100%);
          pointer-events: none;
        }
        .home-hero-content {
          position: relative;
          z-index: 2;
          padding: 5rem 1.5rem 4rem;
          max-width: 720px;
          margin: 0 auto;
        }
        .home-hero-subtitle {
          font-family: "Poppins", sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          margin: 0 0 0.75rem;
        }
        .home-hero-names {
          font-family: "Dancing Script", cursive;
          font-weight: 700;
          font-size: clamp(2.5rem, 10vw, 4.5rem);
          color: #fff;
          margin: 0 0 0.5rem;
          line-height: 1.15;
          text-shadow: 0 4px 24px rgba(0,0,0,0.4);
        }
        .home-hero-amp {
          display: inline-block;
          margin: 0 0.15em;
          color: var(--gold-light);
          font-weight: 700;
        }
        .home-hero-date {
          font-family: "Playfair Display", serif;
          font-size: 1.1rem;
          letter-spacing: 0.2em;
          color: var(--gold-light);
          margin: 0 0 2rem;
        }
        .home-hero-countdown {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem 1rem;
          margin-bottom: 2rem;
        }
        .home-countdown-item {
          min-width: 64px;
          padding: 0.5rem 0.75rem;
          border-radius: 12px;
          background: rgba(10,4,4,0.6);
          border: 1px solid rgba(212,168,75,0.35);
          backdrop-filter: blur(8px);
        }
        .home-countdown-value {
          display: block;
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 1.35rem;
          color: var(--gold-light);
          text-shadow: 0 0 20px rgba(240,201,107,0.5);
        }
        .home-countdown-label {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
        }
        .home-hero-credits {
          font-family: "Playfair Display", serif;
          font-style: italic;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.6);
          margin: 0;
          line-height: 1.6;
        }
        .home-events {
          padding: 4rem 1rem 4.5rem;
          background: linear-gradient(180deg, #0a0404 0%, #120808 100%);
        }
        .home-events-inner {
          max-width: 1120px;
          margin: 0 auto;
        }
        .home-events-title {
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-light);
          margin: 0 0 0.5rem;
          text-align: center;
        }
        .home-events-intro {
          font-size: 0.9rem;
          color: var(--text-muted);
          text-align: center;
          margin: 0 auto 2rem;
          max-width: 480px;
        }
        .home-events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
        }
        .home-event-card {
          display: block;
          padding: 1.25rem 1rem;
          border-radius: 16px;
          background: rgba(20,8,8,0.8);
          border: 1px solid rgba(255,255,255,0.08);
          text-align: left;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .home-event-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.5);
          border-color: rgba(212,168,75,0.4);
        }
        .home-event-emoji { font-size: 1.5rem; display: block; margin-bottom: 0.4rem; }
        .home-event-name {
          font-family: "Playfair Display", serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-light);
          margin: 0 0 0.25rem;
        }
        .home-event-meta, .home-event-time {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin: 0;
        }
        .home-gallery-cta { text-align: center; margin-top: 2.5rem; }
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
        @media (min-width: 768px) {
          .home-hero-content { padding: 6rem 2rem 5rem; }
          .home-hero-names { font-size: clamp(3rem, 8vw, 4.5rem); }
          .home-events { padding: 5rem 1.5rem 5rem; }
        }
      `}</style>
    </motion.main>
  );
}
