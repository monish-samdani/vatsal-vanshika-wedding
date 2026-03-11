import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ROUTE_MUSIC = {
  "/": "/music/home.mp3",
  "/ganesh-pujan": "/music/ganesh-pujan.mp3",
  "/sufi-night": "/music/sufi-night.mp3",
  "/haldi": "/music/haldi.mp3",
  "/sajjangoth": "/music/sajjangoth.mp3",
  "/baraat": "/music/baraat.mp3",
  "/phere": "/music/phere.mp3",
  "/reception": "/music/reception.mp3",
  "/gallery": "/music/gallery.mp3"
};

const volume = 0.8;

export default function MusicPlayer() {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  const src = ROUTE_MUSIC[location.pathname] || "/music/reception.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const newSrc = ROUTE_MUSIC[location.pathname] || "/music/reception.mp3";

    // Fade out current song first
    const fadeOut = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume = Math.max(0, audio.volume - 0.05);
      } else {
        clearInterval(fadeOut);
        audio.pause();
        audio.src = newSrc;
        audio.volume = 0;
        audio.load();

        // Auto play the new song immediately
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setHasInteracted(true);
              // Fade in
              const fadeIn = setInterval(() => {
                if (audio.volume < volume - 0.05) {
                  audio.volume = Math.min(volume, audio.volume + 0.05);
                } else {
                  audio.volume = volume;
                  clearInterval(fadeIn);
                }
              }, 80);
            })
            .catch(() => {
              // Browser blocked autoplay — wait for first user click
              // Music will start on first interaction instead
              setIsPlaying(false);
            });
        }
      }
    }, audio.src ? 80 : 0);

    return () => clearInterval(fadeOut);
  }, [location.pathname]);

  useEffect(() => {
    const handleFirstClick = () => {
      const audio = audioRef.current;
      if (!audio || isPlaying) return;
      const srcForClick = ROUTE_MUSIC[location.pathname] || "/music/reception.mp3";
      audio.src = srcForClick;
      audio.volume = volume;
      audio.load();
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {});
      document.removeEventListener("click", handleFirstClick);
    };

    if (!isPlaying) {
      document.addEventListener("click", handleFirstClick);
    }

    return () => document.removeEventListener("click", handleFirstClick);
  }, [isPlaying, location.pathname]);

  const handleClick = () => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else if (audio && !isPlaying) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        playsInline
      />
      <button
        type="button"
        onClick={handleClick}
        aria-label={isPlaying ? "Stop music" : "Play music"}
        style={{
          position: "fixed",
          bottom: "1.25rem",
          right: "1.25rem",
          zIndex: 35,
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "1px solid rgba(212,168,75,0.5)",
          background: "rgba(10,4,4,0.85)",
          color: "var(--gold-light)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.35rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.5)";
        }}
      >
        {isPlaying ? "🔊" : "🎵"}
      </button>
    </>
  );
}
