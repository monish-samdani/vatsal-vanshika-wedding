import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const links = [
  { to: "/", label: "Home", emoji: "🏠" },
  { to: "/ganesh-pujan", label: "Ganesh Pujan", emoji: "🙏" },
  { to: "/sufi-night", label: "Sufi Night", emoji: "🎤" },
  { to: "/haldi", label: "Haldi", emoji: "💛" },
  { to: "/sajjangoth", label: "Sajjangoth", emoji: "🌺" },
  { to: "/baraat", label: "Baraat", emoji: "🐴" },
  { to: "/phere", label: "Phere", emoji: "🪔" },
  { to: "/reception", label: "Reception", emoji: "✨" },
  { to: "/gallery", label: "Gallery", emoji: "📸" }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`nav-header ${scrolled ? "nav-header--scrolled" : ""}`}>
      <nav className="nav-bar">
        <Link to="/" className="nav-logo-wrap">
          <img
            src="/logo.png"
            srcSet="/logo.png 1x, /logo@2x.png 2x"
            alt="V & V"
            className="nav-logo-img"
            onError={(e) => {
              e.target.style.display = "none";
              const next = e.target.nextElementSibling;
              if (next) next.style.display = "flex";
            }}
          />
          <span className="nav-logo-fallback">♥</span>
        </Link>

        <button
          type="button"
          aria-label="Open menu"
          className="nav-hamburger"
          onClick={() => setOpen(true)}
        >
          <span className="nav-hamburger-line" />
          <span className="nav-hamburger-line" />
          <span className="nav-hamburger-line" />
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="nav-overlay" onClick={() => setOpen(false)} role="presentation">
          <div className="nav-overlay-content" onClick={(e) => e.stopPropagation()}>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className="nav-overlay-link"
                style={({ isActive }) => ({
                  background: isActive ? "linear-gradient(135deg, var(--gold-light), var(--gold))" : "rgba(0,0,0,0.25)",
                  color: isActive ? "#120b02" : "var(--text-light)"
                })}
              >
                <span className="nav-link-emoji">{link.emoji}</span>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .nav-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 40;
          transition: background 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease;
          background: rgba(10,4,4,0.25);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .nav-header--scrolled {
          background: rgba(10,4,4,0.75);
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
          border-bottom: 1px solid rgba(212,168,75,0.2);
        }
        .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .nav-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          width: 52px;
          height: 52px;
        }
        .nav-logo-img {
          width: 52px;
          height: 52px;
          object-fit: contain;
          display: block;
        }
        .nav-logo-fallback {
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          font-size: 1.75rem;
          color: var(--gold-light);
        }
        .nav-hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          padding: 0;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px;
          cursor: pointer;
          color: var(--text-light);
        }
        .nav-hamburger-line {
          width: 18px;
          height: 2px;
          background: var(--gold-light);
          border-radius: 1px;
          margin: 0 auto;
        }
        .nav-overlay {
          position: fixed;
          inset: 0;
          background: rgba(6,2,2,0.96);
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .nav-overlay-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          max-width: 320px;
        }
        .nav-overlay-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.25rem;
          border-radius: 12px;
          font-family: "Playfair Display", serif;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: 1px solid rgba(212,168,75,0.3);
          transition: background 0.2s ease, color 0.2s ease;
        }
        .nav-link-emoji { font-size: 1.15rem; }
        @media (min-width: 960px) {
          .nav-bar { justify-content: space-between; padding: 0.85rem 1.5rem; }
        }
        @media (max-width: 479px) {
          .nav-bar { padding: 0.6rem 1rem; }
          .nav-logo-img { width: 44px; height: 44px; }
          .nav-logo-wrap { width: 44px; height: 44px; }
        }
      `}</style>
    </header>
  );
}
