import React, { useEffect } from "react";
import EventPage from "../components/EventPage";
import { motion } from "framer-motion";

export default function GaneshPujan() {
  useEffect(() => {
    const v = document.getElementById("ganesh-vatsal-text");
    const va = document.getElementById("ganesh-vanshika-text");
    if (v) {
      v.textContent =
        "We're beginning our wedding festivities with blessings from Ganpati Bappa himself. Come join us as we set the most auspicious start to this beautiful journey! 🙏";
    }
    if (va) {
      va.textContent =
        "My favourite part of any wedding is the puja — there's something so grounding and sacred about it. We'd love to have you there with us for this special morning.";
    }
  }, []);

  return (
    <EventPage
      id="ganesh"
      title="Ganesh Pujan & Vinayak Sthapana"
      date="Monday, 23 March 2026"
      time="Ganesh Pujan – 10:15 AM | Vinayak Sthapana – 12:15 PM"
      venue="At Residence"
      address="Jaipur"
      dressCode="Traditional Indian wear in soft pastels"
      emoji="🙏"
      accentColor="#FF8C42"
      particles={["🌸", "🪔", "🌼", "🙏"]}
      overlayGradient="linear-gradient(to bottom, rgba(253,246,236,0.25), rgba(80,40,20,0.5), rgba(10,4,4,0.6))"
      photoFile="ganesh-pujan.jpg"
      imagePosition="center center"
    />
  );
}

