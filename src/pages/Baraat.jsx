import React, { useEffect } from "react";
import EventPage from "../components/EventPage";

export default function Baraat() {
  useEffect(() => {
    const v = document.getElementById("baraat-vatsal-text");
    const va = document.getElementById("baraat-vanshika-text");
    if (v) {
      v.textContent =
        "THE BARAAT. I'll be the one on the horse, waving at everyone, pretending to be cool while internally losing my mind with excitement. DANCE with us! 🐴";
    }
    if (va) {
      va.textContent =
        "I've been waiting to see him arrive like this my whole life. Don't tell him but I'm absolutely going to cry the moment I see that procession! 🌹";
    }
  }, []);

  return (
    <EventPage
      id="baraat"
      title="Baraat Nikasi"
      date="26 March 2026"
      time="6:15 PM"
      venue="Stardom Resort"
      address="Jaisinghpura, Jaipur"
      dressCode="Dance-ready Indian festive wear"
      emoji="🐴"
      accentColor="#D4A84B"
      particles={["🌹", "🎺", "🥁", "✨"]}
      overlayGradient="linear-gradient(to bottom, rgba(180,140,60,0.35), rgba(100,70,20,0.5), rgba(5,2,2,0.6))"
      photoFile="baraat.jpg"
    />
  );
}

