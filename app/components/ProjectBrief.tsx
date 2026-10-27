"use client";
import { useState } from "react";

export default function ProjectBrief() {
  const [saved, setSaved] = useState(false);
  return <form className="brief-form" onSubmit={(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `PROJECT BRIEF — VULCAN VARIANTS\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\n\nThe idea or challenge\n${data.get("challenge")}\n\nTiming\n${data.get("timing") || "To be discussed"}\n`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "vulcan-variants-project-brief.txt"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000); setSaved(true);
  }}>
    <h3>Shape your project brief.</h3><p>Capture the essentials in a brief you can save and share. This form saves a file to your device; it does not send an enquiry.</p>
    <div className="form-row"><label>Your name<input name="name" autoComplete="name" required maxLength={120} /></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} /></label></div>
    <label>What would you like to explore?<textarea name="challenge" rows={4} required maxLength={5000} placeholder="The product, the people it is for, and the problem to solve…" /></label>
    <label>Any timing in mind? <span>(optional)</span><input name="timing" maxLength={200} placeholder="A target date, or still exploring" /></label>
    <button className="button" type="submit">Save project brief <span aria-hidden="true">↓</span></button><p role="status" className="form-status">{saved ? "Your brief is ready. Check your browser’s downloads." : "Your details stay in your browser until you save the brief."}</p>
  </form>;
}
