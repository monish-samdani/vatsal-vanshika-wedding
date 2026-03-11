import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const FALLBACK_BG =
  "linear-gradient(135deg, #120808 0%, #261313 40%, #4a2525 100%)";

function useScrollFadeIn() {
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}

function EventPage({
  id,
  title,
  tagLine,
  date,
  time,
  venue,
  address,
  dressCode,
  emoji,
  accentColor,
  particles,
  overlayGradient,
  photoFile,
  backgroundObjectPosition = "center top"
}) {
  useScrollFadeIn();

  const particleItems = useMemo(() => {
    const count = 20;
    const arr = [];
    for (let i = 0; i < count; i += 1) {
      const symbol = particles[i % particles.length];
      const left = Math.random() * 100;
      const duration = 6 + Math.random() * 8;
      const delay = -Math.random() * 10;
      const size = 18 + Math.random() * 10;
      arr.push({ symbol, left, duration, delay, size, key: `${symbol}-${i}` });
    }
    return arr;
  }, [particles]);

  return (
    <motion.main
      className="page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{ height: "100vh", position: "relative", overflow: "hidden" }}
    >
      {/* Background container */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          zIndex: 0,
          backgroundColor: "#0A0404"
        }}
      >
        <img
          src={`/photos/${photoFile}`}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: backgroundObjectPosition,
            display: "block"
          }}
        />
      </div>

      {/* First overlay: dark tint + blur */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10, 4, 4, 0.55)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          zIndex: 1
        }}
      />
      {/* Second overlay: gradient for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)",
          zIndex: 2
        }}
      />

      {/* Particles */}
      {particleItems.map((p) => (
        <div
          key={p.key}
          className="particle"
          style={{
            left: `${p.left}vw`,
            animation: `floatDown ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            fontSize: `${p.size}px`,
            opacity: 0.8
          }}
        >
          {p.symbol}
        </div>
      ))}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          paddingTop: "5rem",
          paddingBottom: "3.5rem",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div
          className="fade-section event-page-content"
          style={{
            width: "100%",
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "0 1rem",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "2rem"
          }}
        >
          {/* Animated chat bubbles */}
          <section
            aria-label="Messages from the couple"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.4rem"
            }}
          >
            {/* Vatsal — slides in from left */}
            <motion.div
              initial={{ opacity: 0, x: -48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                maxWidth: "100%"
              }}
            >
              <div
                className="chat-avatar"
                style={{
                  width: 48,
                  height: 48,
                  minWidth: 48,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background:
                    "linear-gradient(135deg, var(--gold-light), var(--gold-dark))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "1.1rem",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.45)"
                }}
              >
                <img
                  src="/photos/vatsal-avatar.png"
                  alt="Vatsal"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    const fallback = e.target.nextElementSibling;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <span
                  style={{
                    display: "none",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    color: "rgba(0,0,0,0.8)"
                  }}
                >
                  V
                </span>
              </div>
              <div style={{ maxWidth: "520px", flex: "1 1 auto" }}>
                <div
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "0.25rem"
                  }}
                >
                  VATSAL MANDHANIA
                </div>
                <div
                  className="chat-bubble chat-bubble-left"
                  style={{
                    borderRadius: "18px",
                    borderTopLeftRadius: 4,
                    border: `1px solid ${accentColor}55`,
                    padding: "0.9rem 1.1rem",
                    background:
                      "linear-gradient(135deg, rgba(10,4,4,0.75), rgba(10,4,4,0.25))",
                    boxShadow: "0 18px 45px rgba(0,0,0,0.6)"
                  }}
                >
                  <p
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontStyle: "italic",
                      fontSize: "0.98rem",
                      lineHeight: 1.6,
                      margin: 0
                    }}
                  >
                    <span data-speaker="vatsal" id={`${id}-vatsal-text`} />
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vanshika — slides in from right */}
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                justifyContent: "flex-end",
                maxWidth: "100%"
              }}
            >
              <div style={{ maxWidth: "520px", flex: "1 1 auto", order: 1 }}>
                <div
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "0.25rem",
                    textAlign: "right"
                  }}
                >
                  VANSHIKA DHINGRA
                </div>
                <div
                  className="chat-bubble chat-bubble-right"
                  style={{
                    borderRadius: "18px",
                    borderTopRightRadius: 4,
                    border: `1px solid ${accentColor}55`,
                    padding: "0.9rem 1.1rem",
                    background:
                      "linear-gradient(135deg, rgba(10,4,4,0.75), rgba(10,4,4,0.25))",
                    boxShadow: "0 18px 45px rgba(0,0,0,0.6)"
                  }}
                >
                  <p
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontStyle: "italic",
                      fontSize: "0.98rem",
                      lineHeight: 1.6,
                      margin: 0
                    }}
                  >
                    <span data-speaker="vanshika" id={`${id}-vanshika-text`} />
                  </p>
                </div>
              </div>
              <div
                className="chat-avatar"
                style={{
                  width: 48,
                  height: 48,
                  minWidth: 48,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background:
                    "linear-gradient(135deg, #e879a0, var(--rose))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "1.1rem",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.45)",
                  order: 2
                }}
              >
                <img
                  src="/photos/vanshika-avatar.png"
                  alt="Vanshika"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    const fallback = e.target.nextElementSibling;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <span
                  style={{
                    display: "none",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    color: "rgba(0,0,0,0.8)"
                  }}
                >
                  V
                </span>
              </div>
            </motion.div>
          </section>

          {/* Right side details card */}
          <section
            aria-label="Event details"
            style={{
              alignSelf: "stretch",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "420px",
                borderRadius: "20px",
                padding: "1.6rem 1.5rem 1.4rem",
                background: "rgba(10,4,4,0.55)",
                backdropFilter: "blur(24px)",
                border: `1px solid ${accentColor}44`,
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.7rem"
                }}
              >
                <h1
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    fontSize: "1.35rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    margin: 0
                  }}
                >
                  {title}
                </h1>
                <span style={{ fontSize: "1.6rem" }}>{emoji}</span>
              </div>
              {tagLine && (
                <p
                  style={{
                    fontFamily: '"Dancing Script", cursive',
                    fontSize: "1.05rem",
                    color: "var(--text-light)",
                    marginTop: 0,
                    marginBottom: "0.8rem"
                  }}
                >
                  {tagLine}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  fontSize: "0.9rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                  <span>📅</span>
                  <div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.75 }}>
                      Date
                    </div>
                    <div>{date}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                  <span>⏰</span>
                  <div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.75 }}>
                      Time
                    </div>
                    <div>{time}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem" }}>
                  <span>📍</span>
                  <div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.75 }}>
                      Venue
                    </div>
                    <div style={{ fontWeight: 600 }}>{venue}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {address}
                    </div>
                  </div>
                </div>
              </div>

              {dressCode && (
                <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-start" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      borderRadius: 999,
                      padding: "0.25rem 0.9rem",
                      border: `1px solid ${accentColor}66`,
                      background:
                        "linear-gradient(135deg, rgba(212,168,75,0.18), rgba(10,4,4,0.8))"
                    }}
                  >
                    Dress code: {dressCode}
                  </span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .fade-section.event-page-content {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.8rem !important;
          }
        }
        @media (min-width: 768px) {
          .event-page-content {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
            gap: 2.8rem !important;
          }
        }
        @media (max-width: 600px) {
          main.page {
            padding-top: 4.5rem;
          }
        }
        @media (max-width: 480px) {
          .event-page-content {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </motion.main>
  );
}

export default EventPage;

