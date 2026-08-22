"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface Tech {
  name: string;
  icon: ReactNode;
}

interface TechMarqueeProps {
  tecnologias: Tech[];
}

export default function TechMarquee({ tecnologias }: TechMarqueeProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = track?.parentElement;
    if (!track || !container) return;

    const N = window.innerWidth < 640 ? 3 : 6;
    const itemWidth = container.offsetWidth / N;
    track.querySelectorAll<HTMLElement>("li").forEach((li) => {
      li.style.width = `${itemWidth}px`;
    });

    const count = tecnologias.length;
    const translateEndMobile = track.scrollWidth / 2;
    const translateEndDesktop = (count - N) * itemWidth;

    gsap.set(track, { x: 0 });

    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    if (isMobile) {
      gsap.to(track, {
        x: -translateEndMobile,
        duration: translateEndMobile / 60,
        ease: "none",
        repeat: -1,
      });
      return () => {
        gsap.killTweensOf(track);
      };
    }

    const scrollTrigger = Math.max(
      0,
      container.getBoundingClientRect().top +
        window.scrollY +
        container.offsetHeight / 2 -
        window.innerHeight / 2,
    );
    let acc = 0;

    const moveTo = gsap.quickTo(track, "x", {
      duration: 0.5,
      ease: "power2.out",
    });

    function onWheel(e: WheelEvent) {
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 40;
      if (e.deltaMode === 2) dy *= window.innerHeight;

      if (dy > 0) {
        if (window.scrollY < scrollTrigger) return;
        if (acc >= translateEndDesktop) return;
      } else {
        if (window.scrollY > scrollTrigger) return;
        if (acc <= 0) return;
      }

      e.preventDefault();
      acc = Math.min(translateEndDesktop, Math.max(0, acc + dy));
      moveTo(-acc);
    }

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      gsap.killTweensOf(track);
    };
  }, [tecnologias.length]);

  return (
    <div className="-mx-6 overflow-hidden sm:mx-0">
      <ul
        ref={trackRef}
        className="flex will-change-transform"
        aria-label="Listado de tecnologías"
      >
        {[...tecnologias, ...tecnologias].map((tech, i) => (
          <li
            key={`${tech.name}-${i}`}
            className="flex shrink-0 flex-col items-center gap-3 text-center"
            aria-hidden={i >= tecnologias.length ? "true" : undefined}
          >
            {tech.icon}
            <span className="eyebrow">{tech.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
