"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import ProductFilm from "./ProductFilm";

const query = "(min-width: 901px) and (prefers-reduced-motion: no-preference)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;

export default function ProjectPreview({ src, poster, title, width, height }: {
  src?: string; poster: string; title: string; width: number; height: number;
}) {
  const desktopMotion = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  if (desktopMotion && src) return <ProductFilm src={src} poster={poster} title={title} />;
  return <Image src={poster} alt={`${title} product preview`} width={width} height={height} sizes="(max-width: 900px) 100vw, 1440px" />;
}
