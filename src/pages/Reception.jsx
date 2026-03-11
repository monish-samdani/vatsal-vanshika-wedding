import React, { useEffect } from "react";
import EventPage from "../components/EventPage";

export default function Reception() {
  useEffect(() => {
    const v = document.getElementById("reception-vatsal-text");
    const va = document.getElementById("reception-vanshika-text");
    if (v) {
      v.textContent =
        "By 8:30 PM we'll officially be Mr. & Mrs. Mandhania! The palace is stunning, the food is incredible — come celebrate our new chapter all night with us! ✨";
    }
    if (va) {
      va.textContent =
        "Stardom Resort, fairy lights, a full night of dancing and celebrating — I've dreamed of this evening for years and I want every single one of you there! 💙";
    }
  }, []);

  return (
    <EventPage
      id="reception"
      title="Reception"
      date="Thursday, 26 March 2026"
      time="8:30 PM onwards"
      venue="Stardom Resort"
      address="Jaisinghpura, Jaipur"
      dressCode="Reception formals / cocktail saris & suits"
      emoji="✨"
      accentColor="#60BDFF"
      particles={["✨", "⭐", "💫", "🌟"]}
      overlayGradient="linear-gradient(to bottom, rgba(4,10,40,0.4), rgba(15,35,80,0.5), rgba(5,2,2,0.6))"
      photoFile="reception.jpg"
      backgroundObjectPosition="center center"
    />
  );
}

