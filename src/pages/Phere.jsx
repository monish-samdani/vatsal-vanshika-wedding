import React, { useEffect } from "react";
import EventPage from "../components/EventPage";

export default function Phere() {
  useEffect(() => {
    const v = document.getElementById("phere-vatsal-text");
    const va = document.getElementById("phere-vanshika-text");
    if (v) {
      v.textContent =
        "Midnight. The fire. Seven vows. This is it — the most important moment of my life. Vanshika, I'll be the one who can't stop smiling at the mandap. 🪔";
    }
    if (va) {
      va.textContent =
        "Under the stars, with fire as our witness, we'll make promises that will last a lifetime. Please be on time — this one is forever. ❤️";
    }
  }, []);

  return (
    <EventPage
      id="phere"
      title="Phere (Wedding Ceremony)"
      date="26 March 2026"
      time="Midnight (12:00 AM)"
      venue="Stardom Resort"
      address="Jaisinghpura, Jaipur"
      dressCode="Traditional wedding finery"
      emoji="🪔"
      accentColor="#E8856A"
      particles={["🪔", "🔥", "🌸", "🌺"]}
      overlayGradient="linear-gradient(to bottom, rgba(20,10,40,0.4), rgba(80,25,30,0.5), rgba(5,2,2,0.6))"
      photoFile="phere.jpg"
      backgroundObjectPosition="center center"
    />
  );
}

