"use client";

import dynamic from "next/dynamic";
import { useIdleMount } from "@/lib/useIdleMount";

const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
});

export default function IdleHeroBackground() {
  const ready = useIdleMount();
  if (!ready) return null;
  return <HeroBackground />;
}
