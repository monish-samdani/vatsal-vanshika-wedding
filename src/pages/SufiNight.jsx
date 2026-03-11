import React, { useEffect } from "react";
import EventPage from "../components/EventPage";

export default function SufiNight() {
  useEffect(() => {
    const v = document.getElementById("sufi-vatsal-text");
    const va = document.getElementById("sufi-vanshika-text");
    if (v) {
      v.textContent =
        "Every song that night will carry a little piece of our story. Get ready for an evening of soul, music, and emotions you didn't sign up for 😄";
    }
    if (va) {
      va.textContent =
        "I've been looking forward to this evening for months. Soft lights, beautiful music, and all our favourite people in one room — it's going to be magical. 🎶";
    }
  }, []);

  return (
    <EventPage
      id="sufi"
      title="Sufi Night"
      tagLine="Where every note carries a little bit of our story."
      date="25 March 2026"
      time="7:30 PM onwards"
      venue="Stardom Resort"
      address="Jaisinghpura, Jaipur"
      dressCode="Elegant indo-western / Sufi chic"
      emoji="🎤"
      accentColor="#8B5CF6"
      particles={["🎵", "✨", "🌙", "🎶"]}
      overlayGradient="linear-gradient(to bottom, rgba(10,14,40,0.4), rgba(30,20,50,0.5), rgba(5,2,2,0.6))"
      photoFile="sufi-night.jpg"
    />
  );
}

