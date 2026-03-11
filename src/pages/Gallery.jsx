import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const TABS = [
  "All",
  "Ganesh Pujan",
  "Sufi Night",
  "Haldi",
  "Sajjangoth",
  "Baraat",
  "Phere",
  "Reception",
  "Family"
];

const PHOTOS = Array.from({ length: 12 }).map((_, i) => {
  const index = i + 1;
  const base = `/photos/gallery-${index}.jpg`;
  const mapping = [
    "Ganesh Pujan",
    "Ganesh Pujan",
    "Sufi Night",
    "Haldi",
    "Haldi",
    "Sajjangoth",
    "Baraat",
    "Phere",
    "Reception",
    "Reception",
    "Family",
    "Family"
  ];
  const category = mapping[i] || "All";
  return {
    id: `photo-${index}`,
    src: base,
    alt: `Vatsal & Vanshika — ${category} ${index}`,
    category,
    caption: `${category} — a moment from our story`
  };
});

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(() => {
    if (active === "All") return PHOTOS;
    return PHOTOS.filter((p) => p.category === active);
  }, [active]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filtered.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.main
      className="page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{
        minHeight: "100vh",
        background: "#0A0404",
        paddingTop: "5.2rem",
        paddingBottom: "3.4rem"
      }}
    >
      <div
        className="page-content-wrap"
        style={{
          maxWidth: "1120px",
          margin: "0 auto"
        }}
      >
        <header
          style={{
            marginBottom: "1.4rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)"
            }}
          >
            Moments from our celebrations
          </p>
          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: "1.6rem",
              margin: 0
            }}
          >
            Gallery
          </h1>
          <p
            style={{
              fontFamily: '"Playfair Display", serif',
              fontStyle: "italic",
              fontSize: "0.95rem",
              color: "var(--text-muted)",
              maxWidth: "32rem"
            }}
          >
            From the first aarti to the last dance, here are little windows into
            the days that made us Mr. &amp; Mrs. Mandhania.
          </p>
        </header>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "1.4rem"
          }}
        >
          {TABS.map((tab) => {
            const isActive = active === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                style={{
                  borderRadius: 999,
                  border: `1px solid ${
                    isActive ? "var(--gold-light)" : "rgba(255,255,255,0.16)"
                  }`,
                  padding: "0.3rem 0.9rem",
                  background: isActive
                    ? "linear-gradient(135deg, var(--gold-light), var(--gold))"
                    : "transparent",
                  color: isActive ? "#120b02" : "var(--text-light)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  boxShadow: isActive
                    ? "0 12px 30px rgba(0,0,0,0.7)"
                    : "none"
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Masonry grid — mobile first: 1 col → 2 → 3 */}
        <section
          aria-label="Photo gallery"
          className="gallery-grid"
          style={{
            columnCount: 1,
            columnGap: "0.9rem"
          }}
        >
          {filtered.map((photo, index) => (
            <figure
              key={photo.id}
              style={{
                margin: 0,
                marginBottom: "0.9rem",
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
                breakInside: "avoid",
                cursor: "pointer",
                background:
                  "radial-gradient(circle at top, rgba(255,255,255,0.04), rgba(10,4,4,1))"
              }}
              onClick={() => openLightbox(index)}
            >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                    objectPosition: "top",
                    transition: "transform 0.35s ease"
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const placeholder =
                      e.currentTarget.parentElement.querySelector(
                        "[data-placeholder]"
                      );
                    if (placeholder) {
                      placeholder.style.display = "flex";
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                <div
                  data-placeholder
                  style={{
                    display: "none",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2.5rem 1.5rem",
                    background:
                      "linear-gradient(145deg, #141010, #241010, #3a1818)",
                    color: "var(--text-muted)"
                  }}
                >
                  <span style={{ fontSize: "2rem", marginRight: "0.6rem" }}>
                    📷
                  </span>
                  <span
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontStyle: "italic",
                      fontSize: "0.9rem"
                    }}
                  >
                    Photo coming soon
                  </span>
                </div>
              </div>
              <figcaption
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "0.6rem 0.8rem 0.5rem",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0))",
                  transform: "translateY(18px)",
                  transition: "transform 0.3s ease"
                }}
              >
                <div
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontStyle: "italic",
                    fontSize: "0.78rem"
                  }}
                >
                  {photo.caption}
                </div>
              </figcaption>
              <style>{`
                figure:hover figcaption {
                  transform: translateY(0);
                }
              `}</style>
            </figure>
          ))}
        </section>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            style={{
              position: "fixed",
              top: "1.3rem",
              right: "1.6rem",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.5)",
              background: "rgba(0,0,0,0.5)",
              color: "var(--text-light)",
              padding: "0.2rem 0.7rem",
              cursor: "pointer"
            }}
          >
            Close
          </button>
          <button
            type="button"
            onClick={goPrev}
            style={{
              position: "fixed",
              left: "1.4rem",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.5)",
              background: "rgba(0,0,0,0.5)",
              color: "var(--text-light)",
              padding: "0.4rem 0.7rem",
              cursor: "pointer"
            }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            style={{
              position: "fixed",
              right: "1.4rem",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.5)",
              background: "rgba(0,0,0,0.5)",
              color: "var(--text-light)",
              padding: "0.4rem 0.7rem",
              cursor: "pointer"
            }}
          >
            ›
          </button>
          <div
            style={{
              maxWidth: "90vw",
              maxHeight: "80vh",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 25px 80px rgba(0,0,0,0.9)",
              background: "#050202"
            }}
          >
            <img
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              loading="lazy"
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                display: "block",
                objectFit: "cover",
                objectPosition: "top"
              }}
            />
            <div
              style={{
                padding: "0.6rem 0.9rem 0.8rem",
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontSize: "0.9rem",
                textAlign: "center"
              }}
            >
              {filtered[lightboxIndex].caption}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-grid {
          column-count: 1;
        }
        @media (min-width: 640px) {
          .gallery-grid {
            column-count: 2;
          }
        }
        @media (min-width: 960px) {
          .gallery-grid {
            column-count: 3;
          }
        }
      `}</style>
    </motion.main>
  );
}

