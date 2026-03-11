import React, { useEffect } from "react";
import EventPage from "../components/EventPage";

export default function Haldi() {
  useEffect(() => {
    const v = document.getElementById("haldi-vatsal-text");
    const va = document.getElementById("haldi-vanshika-text");
    if (v) {
      v.textContent =
        "It's a CARNIVAL. With haldi. And a pool. I genuinely cannot promise what state I'll be in by the end of this, but I promise it'll be the most fun morning of your life!";
    }
    if (va) {
      va.textContent =
        "We planned this as a full-on festival — balloons, colours, music, and everyone absolutely drenched in haldi. Wear something you don't mind ruining! 💛🎪";
    }
  }, []);

  return (
    <EventPage
      id="haldi"
      title="The Joy Carnival — Haldi"
      date="26 March 2026"
      time="10:00 AM"
      venue="Stardom Resort"
      address="Jaisinghpura, Jaipur"
      dressCode="Bright yellows, whites & pool-friendly outfits"
      emoji="💛"
      accentColor="#F0C030"
      particles={["🌼", "💛", "🎪", "🎈"]}
      overlayGradient="linear-gradient(to bottom, rgba(64,144,224,0.35), rgba(180,140,40,0.45), rgba(5,2,2,0.55))"
      photoFile="haldi.jpg"
    />
  );
}

