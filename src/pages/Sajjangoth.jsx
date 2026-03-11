import React, { useEffect } from "react";
import EventPage from "../components/EventPage";

export default function Sajjangoth() {
  useEffect(() => {
    const v = document.getElementById("sajjangoth-vatsal-text");
    const va = document.getElementById("sajjangoth-vanshika-text");
    if (v) {
      v.textContent =
        "This is the traditional pre-wedding ceremony where both families come together officially. It's intimate, heartfelt, and honestly my favourite moment of it all.";
    }
    if (va) {
      va.textContent =
        "Sajjangoth is where the real emotions start. Surrounded by family, beautiful Rajasthani decor, and the most incredible food — this one is going to hit different. 🌺";
    }
  }, []);

  return (
    <EventPage
      id="sajjangoth"
      title="Sajjangoth"
      date="26 March 2026"
      time="1:30 PM"
      venue="Stardom Resort"
      address="Jaisinghpura, Jaipur"
      dressCode="Traditional Rajasthani / Indian formals"
      emoji="🌺"
      accentColor="#E879A0"
      particles={["🌺", "🌸", "🪷", "💐"]}
      overlayGradient="linear-gradient(to bottom, rgba(200,100,120,0.35), rgba(100,30,50,0.5), rgba(5,2,2,0.6))"
      photoFile="sajjangoth.jpg"
    />
  );
}

