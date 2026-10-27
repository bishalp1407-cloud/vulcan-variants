"use client";

import { useEffect, useRef, useState } from "react";

export default function ProductFilm({ src = "/videos/canine-carrier-clean.mp4", poster = "/images/canine-carrier-clean.jpg", title = "Canine Carrier" }: { src?: string; poster?: string; title?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let active = true;
    const canPlay = () => active && visible && !document.hidden && !motion.matches && !userPaused;
    const update = () => {
      // Reduced-motion visitors can choose playback with native controls.
      video.controls = motion.matches;
      if (!canPlay()) { video.pause(); return; }
      void video.play().then(() => {
        if (!canPlay()) video.pause();
        else setAutoplayBlocked(false);
      }).catch(() => { if (active) setAutoplayBlocked(true); });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      update();
    }, { threshold: [0, 0.15] });
    observer.observe(video);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      active = false;
      observer.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, [userPaused, src]);

  return <div>
    <div className="project-film">
      <video key={src} ref={videoRef} loop muted playsInline preload="metadata" poster={poster} aria-label={`${title} looping product film`}>
        <source src={src} type="video/mp4" />
        Your browser does not support video playback. <a href={src}>Download the product film.</a>
      </video>
    </div>
    <div className="film-toolbar">
      <p className="scroll-film-hint">Product film · {autoplayBlocked ? "Press play to start the loop." : "Loops automatically while in view."}</p>
      <p className="reduced-film-hint">Use the video controls to explore the product.</p>
      <button type="button" className="film-mode-toggle" onClick={() => {
        if (autoplayBlocked) {
          void videoRef.current?.play().then(() => { setAutoplayBlocked(false); setUserPaused(false); }).catch(() => setAutoplayBlocked(true));
        } else setUserPaused((current) => !current);
      }}>{autoplayBlocked ? "Play film" : userPaused ? "Resume animation" : "Pause animation"}</button>
    </div>
  </div>;
}
