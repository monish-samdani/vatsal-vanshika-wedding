import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Nav from "./components/Nav";
import MusicPlayer from "./components/MusicPlayer";
import Home from "./pages/Home";
import GaneshPujan from "./pages/GaneshPujan";
import SufiNight from "./pages/SufiNight";
import Haldi from "./pages/Haldi";
import Sajjangoth from "./pages/Sajjangoth";
import Baraat from "./pages/Baraat";
import Phere from "./pages/Phere";
import Reception from "./pages/Reception";
import Gallery from "./pages/Gallery";

function CustomCursor() {
  useEffect(() => {
    const dot = document.createElement("div");
    dot.className = "vv-cursor-dot";
    const ring = document.createElement("div");
    ring.className = "vv-cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    const move = (e) => {
      const { clientX, clientY } = e;
      dot.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.body.removeChild(dot);
      document.body.removeChild(ring);
    };
  }, []);

  return null;
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <MusicPlayer />
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/ganesh-pujan" element={<GaneshPujan />} />
          <Route path="/sufi-night" element={<SufiNight />} />
          <Route path="/haldi" element={<Haldi />} />
          <Route path="/sajjangoth" element={<Sajjangoth />} />
          <Route path="/baraat" element={<Baraat />} />
          <Route path="/phere" element={<Phere />} />
          <Route path="/reception" element={<Reception />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

