"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function StudioMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -24 },
        prevent: (node) => node.tagName === "TEXTAREA",
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Animate actual lines, rather than individual letters, to keep the type calm.
      const heroLines = rootRef.current?.querySelectorAll("[data-hero-line]");
      if (heroLines?.length) gsap.from(heroLines, {
        yPercent: 110,
        duration: 1.05,
        stagger: 0.13,
        ease: "power3.out",
        clearProps: "transform",
      });
      gsap.utils.toArray<HTMLElement>("[data-heading-reveal]", rootRef.current!).forEach((heading) => {
        gsap.from(heading.querySelectorAll("[data-text-line]"), {
          yPercent: 110,
          duration: 0.95,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: heading, start: "top 92%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-text-group]", rootRef.current!).forEach((group) => {
        gsap.from(group.querySelectorAll(":scope > p, :scope > div > p"), {
          y: 14,
          opacity: 0.72,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: group, start: "top 90%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".section-heading h2, .studio-heading h2, .product-description h2", rootRef.current!).forEach((heading) => {
        gsap.from(heading, {
          y: 8, opacity: 0.72, duration: 0.8, ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: heading, start: "top 94%", once: true },
        });
      });
      const entryElements = rootRef.current?.querySelectorAll("[data-entry]");
      if (entryElements?.length) gsap.from(entryElements, {
        y: 20,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]", rootRef.current!).forEach((element) => {
        gsap.from(element, {
          y: 24,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        });
      });
      const refresh = () => { lenis.resize(); ScrollTrigger.refresh(); };
      const frame = requestAnimationFrame(refresh);
      // Opening the brief changes the page height without a window resize.
      const details = rootRef.current?.querySelector("details");
      details?.addEventListener("toggle", refresh);
      let active = true;
      document.fonts.ready.then(() => { if (active) refresh(); });
      return () => {
        active = false;
        cancelAnimationFrame(frame);
        details?.removeEventListener("toggle", refresh);
        gsap.ticker.remove(tick);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        gsap.ticker.lagSmoothing(500, 33);
      };
    }, rootRef);
    return () => media.revert();
  }, [pathname]);

  return <div ref={rootRef}>{children}</div>;
}
